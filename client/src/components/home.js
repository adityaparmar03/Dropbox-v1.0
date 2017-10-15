import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as myactions from '../action_creators/home';
import axios from 'axios';

import { withRouter } from 'react-router-dom'
import Menu from './menu'
import  '../css/uploadfile.css'
import '../css/table.css'
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
            foldertrack:[],
            currentfolderid:0,
            publicsharinglink:"",
            sharedcontentid:""
           
          
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
    share(file){
       var link="http://localhost:9000/files/"+file.virtualname 
       this.setState({publicsharinglink:link})
       this.setState({sharedcontentid:file.contentid})


    }
  
    

    handleFileUpload = (event) => {
        
               
                    const payload = new FormData();
                    payload.append('myfile', event.target.files[0]);
                    payload.append('userid',this.state.userid);
                    payload.append('folderid',this.state.currentfolderid);
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
            
               
                  
                   
                  // window.onpopstate = this.onBackButtonEvent;
                   
                  if(typeof(Storage) !== "undefined") {
                
                    if (sessionStorage.fname) {
                        if(sessionStorage.fname === "root")
                            this.props.INIT(token,"root")
                        else    
                            this.props.INITLOADFOLDER(token, sessionStorage.fname)
                       
                    } else {
                        
                        sessionStorage.fname = "root"
                        this.props.INIT(token,"root")
                    }

                    if (sessionStorage.ft) {
                        console.log("one")
                        console.log((sessionStorage.foldertrack));
                        console.log(this.state.foldertrack);
                        this.state.foldertrack= (JSON.parse(sessionStorage.foldertrack))
                          
                    } else 
                    {
                        
                        console.log("two")
                        this.setState({foldertrack:[{contentid:"root",originalname:"Dropbox",seq:0}]})
                        sessionStorage.foldertrack = JSON.stringify([{contentid:"root",originalname:"Dropbox",seq:0}]);
                        sessionStorage.ft ="yes"
                    }

                    console.log((sessionStorage.foldertrack));
                    console.log(this.state.foldertrack);

                 } 

                 
                
            //this.props.LOADFOLDER(this.state.firstname);
        }
      }
      getData(folder,type){
          var url = "http://localhost:9000/";
          this.setState({parentid:folder.contentid})

          if(folder.contentid==="root"){
            axios.post(url+"folder/root", {"userid":this.state.userid}).then((response)=>{
               
                this.props.LOADFOLDER(this.state.userid,response.data.contentid);
           
          }).catch(function (error) {
              //return dispatch({ type : "HOME_ERROR", payload : error } )
            });
          }
          else{
            this.props.LOADFOLDER(this.state.userid,folder.contentid);
          }
          
          if(type==="add"){
            this.state.foldertrack.push({contentid:folder.contentid,originalname:folder.originalname,seq:folder.contentid})
            sessionStorage.foldertrack = JSON.stringify(this.state.foldertrack)
            }
          if(type==="remove"){
            if(folder.contentid!=="root")  
            { this.state.foldertrack = this.state.foldertrack.filter(function(item){
                return item.seq <= folder.contentid;
              });
              sessionStorage.foldertrack = JSON.stringify(this.state.foldertrack);
            }else{
                this.state.foldertrack = [{contentid:"root",originalname:"Dropbox",seq:0}]
                sessionStorage.foldertrack = JSON.stringify(this.state.foldertrack);
            }

          }
         
      }
     
      componentWillReceiveProps(nextProps) {
        if (nextProps.home) {
            this.check=0;

            this.setState({
                email:nextProps.home.email,
                firstname:nextProps.home.firstname,
                files:nextProps.home.files.reverse(),
                status:nextProps.home.status,
                msg:nextProps.home.msg,
                userid:nextProps.home.userid,
                currentfolderid:nextProps.home.currentfolderid
                
              })

              
          
          
        }
    }  
    
    check=0;
    star(isstar,contentid){
        if(isstar==="YES"){
            return <img onClick={()=>this.props.dostar(contentid,"NO",this.state.currentfolderid,this.state.userid)} src={require('../images/bluestar.png')} alt="" style={{width:"20px",height:"20px"}}/>           
        }
        else{
            return <img onClick={()=>this.props.dostar(contentid,"YES",this.state.currentfolderid,this.state.userid)} src={require('../images/whitestar.png')} alt="" style={{width:"20px",height:"20px"}}/>           
            
        }
    }
    display(file,i){
        
        if(file.type==="file")
        {
            this.check =1;
            var star = file.star;
            console.log(star)

        return (<tr key={file.contentid}>
            <td style={{width:"50%"}}>

            <img src={require('../images/file.png')} alt="" style={{width:"50px",height:"50px"}}/>    
            <a  href={"http://localhost:9000/files/"+file.virtualname} target="_blank">{file.originalname}</a>
            {this.star(file.star,file.contentid)}
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
                
                <li role="presentation">
                <a href={"http://localhost:9000/files/"+file.virtualname} download>Download</a></li>
                <li><a data-toggle="modal" data-target="#fileModal" onClick={()=>this.share(file)}>Share</a></li>
                <li><a>Delete</a></li>
            </ul>
            </td>     
            </tr>
            )
        }
        else if(file.type==="folder"){
            this.check =1;
        
        return ( <tr key={file.contentid}>
            <td  style={{width:"50%"}}>
            
            <img src={require('../images/folder.png')} alt="" style={{width:"50px",height:"50px"}}/>        
            <button className="btn btn-link"  onClick={()=>this.getData(file,"add")}>{file.originalname}</button> 
            {this.star(file.star,file.contentid)}
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
                
                <li><a data-toggle="modal" data-target="#folderModal" onClick={()=>this.share(file)}>Share</a></li>
                <li><a>Delete</a></li>
            
         
            </ul>
            </td> 
            </tr>)
        }
        else{
           if(this.check===0){
            return (<tr key={i}>
                <td>
                <b>NO CONTENT</b>
                </td>
               
                </tr>  )
           }
             
        }
        
    }
    errordisplay(){
        if(this.state.msg!=="token verified successfully"){
            if(this.state.status==="success"){
                return (<div className="alert alert-success alert-dismissable fade in">
                <a  className="close" data-dismiss="alert" aria-label="close">&times;</a>
                {this.state.msg} </div>)
            }else{
                return (<div className="alert alert-danger alert-dismissable fade in">
                <a className="close" data-dismiss="alert" aria-label="close">&times;</a>
                {this.state.msg} </div>)
            }
        }else{
            <div></div>
        } 
    }
    render() {
        return (
            <div className="container-fluid">  
               
            <div className="row">
                <div className="col-6 col-md-2">
                <Menu/>
                </div>
                <div className="col-6 col-md-8">
               
                {this.errordisplay()}
                    <div style={{marginTop:"5%"}}>
                        <h4>Dropbox</h4>
                    </div>
                    <div>
                        {this.state.foldertrack.map((item,i)=>
                        <div style={{display:"inline"}}>
                        <button className="btn btn-link" onClick={()=>this.getData(item,"remove")}>{item.originalname}
                        </button>></div>)}
                    </div>    
                    <div>
                    <table className="table">
                    <thead>
                     <tr>
                         
                            <th  style={{width:"50%"}}>Name</th>
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
                    <input type="file" name="myfile" onChange={this.handleFileUpload}/>
                    </div>
                    <br/><br/>
                    <input type="text" className="form-control" ref = "foldername" 
                    id="newfoldername" placeholder="Folder Name" style={{width:"150px"}}/>
                    <br/>
                    <button className="btn btn-primary" style={{width:"150px"}}
                    onClick={()=>this.props.UploadFolder(this.state.currentfolderid,
                    this.refs.foldername.value,this.state.userid)}>Create</button>
                    
                    </div>
                </div>
            </div>
            <div className="modal fade" id="fileModal" role="dialog">
                <div className="modal-dialog"> 
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Share</h4>
                    </div>
                    <div className="modal-body">
                    <p>Public Link:<input className="form-control" value={this.state.publicsharinglink}/></p>
                    <hr/>
                    <input placeholder="Email" className="form-control" ref="fileemailid"/><br/>
                    <button className="btn btn-primary"  onClick={()=>this.props.shareByEmail( this.refs.fileemailid.value,this.state.userid,this.state.sharedcontentid)}>Share</button>
                  
                    </div>
                    
                   
                    <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
      
                </div>
            </div>
            <div className="modal fade" id="folderModal" role="dialog">
                <div className="modal-dialog"> 
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Share</h4>
                    </div>
                    <div className="modal-body">
                    
                    <input placeholder="Email"  className="form-control"
                    ref="folderemailid" /><br/>
                    <button className="btn btn-primary"
                    onClick={()=>this.props.shareByEmail(this.refs.folderemailid.value,this.state.userid,this.state.sharedcontentid)}>Share</button>
                    </div>
                    
                    
                   
                    <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
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