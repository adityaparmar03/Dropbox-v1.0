import axios from 'axios';

var url = "http://localhost:9000/";

export function INIT(token){
  return  dispatch => {
     
      axios.post(url+"activitylog", {"token":token})
        .then(function (response) {
          return dispatch({ type : "ACTIVITYLOG_RESULT", payload : response.data } )
        })
        .catch(function (error) {
          return dispatch({ type : "ACTIVITYLOG_ERROR", payload : error } )
        });
       
   }
}




export function LOGOUT(token){
  
    localStorage.clear();
    sessionStorage.clear();
    return ({ type : "LOGOUT", payload : "" } )
     
         
     
  }