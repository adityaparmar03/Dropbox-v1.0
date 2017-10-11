import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as myactions from '../action_creators/profile';
import { withRouter } from 'react-router-dom'
import Menu from './menu'


class Profile extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            email:"",
            password:"",
            firstname:"",
            lastname:"",
            aboutme:"",
            interests:"",
            status:"",
            msg:"",
            userid:""
        }
    }
    updateState(name, value){
            var user = this.state.user;
            
            if(name==="email")
                user.email = value;
            if(name==="password")
                user.password = value;
            
            this.setState({user})
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
          this.setState({
            email:nextProps.profile.email,
            password:nextProps.profile.password,
            firstname:nextProps.profile.firstname,
            lastname:nextProps.profile.lastname,
            aboutme:nextProps.profile.aboutme,
            interests:nextProps.profile.interests,
            status:nextProps.profile.status,
            msg:nextProps.profile.msg,
            userid:nextProps.profile.userid,
          
          })
        }
    }

    componentDidMount() {
        var token = localStorage.getItem("aditya-token");
        
        if(localStorage.getItem("aditya-token")===null)
        {
            this.props.history.push('/signin');
        }
        else{

          this.props.INIT(token);
                             
        }
      }
    
   
    
    render() {
        return (
            <div className="container-fluid">  
                <div className="row">
                    <div className="col-6 col-md-3">
                       <Menu/>
                </div>
                <div className="col-6 col-md-6">
                    <div style={{paddingTop:"5%"}}> 
                        <h5>Personal Account</h5>
                        <hr/>
                        <div style={{height:"600px",overflow:"scroll"}}>

                        <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" 
                        value={this.state.email} id="email" disabled/>
                        </div>

                         <div className="form-group">
                        <label  htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" 
                        value={this.state.password} id="pwd"/>
                        </div>

                        <div className="form-group">
                        <label  htmlFor="fn">First Name:</label>
                        <input type="text" className="form-control"
                        value={this.state.firstname} id="fn"/>
                        </div>

                        <div className="form-group">
                        <label  htmlFor="ls">Last Name:</label>
                        <input type="text" className="form-control"
                        value={this.state.lastname} id="ls" />
                        </div>
                        
                        <div className="form-group">
                        <label  htmlFor="about">About me:</label>
                        <textarea type="text" className="form-control" 
                        value={this.state.aboutme } id="about" ></textarea>
                        </div>

                        <div className="form-group">
                        <label  htmlFor="int">My Interests:</label>
                        <textarea type="text" className="form-control" 
                        value={this.state.interests} id="int" ></textarea>
                        </div>

                         
                        <button type="submit" className="btn btn-primary">Save</button>
                        
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
        
         profile : state.profile
     }
 }
 function matchDispatchToProps(dispatch){
     
     return bindActionCreators(myactions,dispatch)
   
     
 }
 
 
 export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Profile));