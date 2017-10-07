import React, {Component} from 'react';


class Nav extends Component {
   
   
    render() {
        return (
            
                <div style={{boxShadow : '0px 0px 5px #888888'}}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-white justify-content-between">
               
              
                
                  <ul className="nav mx-auto">
                    <li className="nav-item">
                    <a className="navbar-brand">
                      <img src={require("../images/dropbox_logo.svg")} width="50" height="50" alt=""/>   
                      <b style={{fontSize:'30px', marginLeft:"15px"}}>Dropbox</b>
                      </a>
                    </li>
                   
                   
                  </ul>
               
                
              </nav>
             </div>
               
         
          
        );
    }
}



export default Nav;