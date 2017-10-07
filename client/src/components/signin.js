import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as myactions from '../action_creators/signin';




class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            user:{
              
                email:"",
                password:""
            }
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
    
    
    render() {
        return (
            <div style={{backgroundColor:"white",width:"70%"}}>
                  <input type="email" className="form-control" placeholder="Email" 
                  onChange={e => this.updateState('email',e.target.value)} required/><br/>
                  <input type="password" className="form-control" placeholder="Password" 
                  onChange={e => this.updateState('password',e.target.value)} required/><br/>
                  <button className="btn btn-primary" onClick={()=>this.props.SignIn(this.state)}> Sign in</button>
            </div>
          
        );
    }
}
function mapStateToProps(state){
    
     return{
        
         signin : state.signin
     }
 }
 function matchDispatchToProps(dispatch){
     
     return bindActionCreators(myactions,dispatch)
   
     
 }
 
 
 export default connect(mapStateToProps,matchDispatchToProps)(SignIn);