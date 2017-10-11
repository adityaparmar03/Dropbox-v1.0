import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as myactions from '../action_creators/home';

import { withRouter } from 'react-router-dom'
import Menu from './menu'
import  '../css/uploadfile.css'

class Home extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            email:"",
            firstname:"",
            status:"",
            msg:"",
            userid:"",
            files:[],
            initialfolder:"root",
          
        }
    }
    /*updateState(name, value){
            var user = this.state.user;
            
            if(name==="email")
                user.email = value;
            if(name==="password")
                user.password = value;
            
            this.setState({user})
    }*/
    

    handleFileUpload = (event) => {
        
                const payload = new FormData();
                payload.append('myfile', event.target.files[0]);
                payload.append('userid', 21);
                this.props.UploadFile(payload);
                event.target.value = null;
        
            };
        componentDidMount() {
        var token = localStorage.getItem("aditya-token");
        
        if(localStorage.getItem("aditya-token")===null)
        {
            this.props.history.push('/signin');
        }
        else{
            
               
                   this.props.INIT(token,this.state.initialfolder)
                   
                  // window.onpopstate = this.onBackButtonEvent;
                   
                  if(typeof(Storage) !== "undefined") {
                    if (sessionStorage.fname) {
                        sessionStorage.fname = "hi"
                    } else {
                        //console.log(sessionStorage.fname)
                        sessionStorage.fname = "root";
                    }
                 } 
                 console.log(sessionStorage.fname)
            
            //this.props.LOADFOLDER(this.state.firstname);
        }
      }
      onBackButtonEvent = (e) => {
        console.log("Back pressed..")
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.home) {
          this.setState({
            email:nextProps.home.email,
            firstname:nextProps.home.firstname,
            files:nextProps.home.files,
            status:nextProps.home.status,
            msg:nextProps.home.msg,
            userid:nextProps.home.userid,
          
          })
        }
    }  
    display(file,i){
        if(file.type==="file")
        return (<tr key={file.contentid}>
            <td>
            <img src={require('../images/file.png')} alt="" style={{width:"50px",height:"50px"}}/>    
            <a  href={"http://localhost:9000/files/"+file.virtualname} target="_blank">{file.originalname}</a>
            </td>
            <td>
            <p>{(file.date).substring(0,25)}</p>    
            </td>
            <td>
            <p>Only you</p>    
            </td>
            <td>
            <button type="button" className="btn btn-default dropdown-toggle" id="menu1"
             data-toggle="dropdown"><b>&middot;&middot;&middot;</b></button>
            <ul className="dropdown-menu" role="menu">
                
                <li role="presentation"><a role="menuitem" tabindex="-1" 
                href={"http://localhost:9000/files/"+file.virtualname} download>Download</a></li>
         
            </ul>
            </td>     
            </tr>
            )
        else
        return ( <tr key={file.contentid}>
            <td>
            <img src={require('../images/folder.png')} alt="" style={{width:"50px",height:"50px"}}/>        
            <button className="btn btn-link"  onClick={()=>this.props.LOADFOLDER(this.state.userid,file.contentid)}>{file.originalname}</button> 
            </td>
            <td>
            <p>{(file.date).substring(0,25)}</p>    
            </td>
            <td>
            <p>Only you</p>    
            </td>
            <td>
            <button type="button" className="btn btn-default dropdown-toggle" id="menu1"
             data-toggle="dropdown"><b>&middot;&middot;&middot;</b></button>
            <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                
                <li role="presentation"><a role="menuitem" tabindex="-1" 
                href=""></a></li>
         
            </ul>
            </td> 
            </tr>
        )
    }
    render() {
        return (
            <div className="container-fluid">  
            <div className="row">
                <div className="col-6 col-md-2">
                <Menu/>
                </div>
                <div className="col-6 col-md-8">
                    <div style={{marginTop:"5%"}}>
                        <h4>Dropbox</h4>
                    </div>
                    <div>
                    <table className="table">
                    <thead>
                     <tr>
                         
                            <th>Name</th>
                            <th>Date</th>
                            <th>Member</th>
                            <th></th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                          
                         this.state.files.map((this.display),this)
                          
                      }
                    </tbody>  
                     </table>
                </div>
                </div>
                
                <div className="col-6 col-md-2">
                    Hello, {this.state.firstname}
                    <button className="btn btn-link" onClick={()=>{this.props.LOGOUT();this.props.history.push('/signin');}}>logout </button>
                    <br/>
                    <div style={{marginTop:"40%"}}>
                    <div className="upload-filebtn-wrapper">
                    <button className="btn btn-primary" style={{width:"150px"}} >Upload a file</button>
                    <input type="file" name="myfile"  onChange={this.handleFileUpload}/>
                    </div>
                    <br/><br/>
                    <input type="text" className="form-control" id="newfoldername" placeholder="Folder Name" style={{width:"150px"}}/>
                    <br/>
                    <button className="btn btn-primary" style={{width:"150px"}}>Create</button>
                    </div>
                </div>
            </div>
          </div>
        );
    }
}
function mapStateToProps(state){
    
     return{
        
         home : state.home
     }
 }
 function matchDispatchToProps(dispatch){
     
     return bindActionCreators(myactions,dispatch)
   
     
 }
 
 
 export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Home));