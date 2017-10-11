import axios from 'axios';

var url = "http://localhost:9000/";

export function Upload(payload){
  return  dispatch => {
      
      axios.post(url+"home", {"file":payload})
        .then(function (response) {
          return dispatch({ type : "UPLOAD_RESULT", payload : response.data } )
        })
        .catch(function (error) {
          return dispatch({ type : "UPLOAD_ERROR", payload : error } )
        });
       
   }
}
export function LOGOUT(token){

  localStorage.clear();

  return ({ type : "LOGOUT", payload : "" } )
   
       
   
}

