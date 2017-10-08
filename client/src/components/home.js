import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as myactions from '../action_creators/signin';
import { withRouter } from 'react-router-dom'




class Home extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
           
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
    componentDidMount() {
        var token = localStorage.getItem("aditya-token");
        
        if(localStorage.getItem("aditya-token")===null)
        {
            this.props.history.push('/signin');
        }
        else{
            
            // verify token 
            // get email and firstname to maintain session
            //INIT call
            
        }
      }
    
    render() {
        return (
            <div className="row">
                <div className="col-6 col-md-3">
                    <div className="jumbotron" style={{height:"auto"}}>
                    <button onClick={()=>this.props.history.push('/signin')}>logout </button>
                   </div>
                </div>
                <div className="col-6 col-md-6">{}</div>
                <div className="col-6 col-md-3">.col-6 .col-md-4</div>
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