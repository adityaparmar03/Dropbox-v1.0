import axios from 'axios';

var url = "http://localhost:9000/";

export function INIT(token){
  return  dispatch => {
     
      axios.post(url+"profile", {"token":token})
        .then(function (response) {
          return dispatch({ type : "PROFILE_RESULT", payload : response.data } )
        })
        .catch(function (error) {
          return dispatch({ type : "PROFILE_ERROR", payload : error } )
        });
       
   }
}
export function UPDATE(user){
    return  dispatch => {
       
        axios.post(url+"profile/update", {"user":user})
          .then(function (response) {
            return dispatch({ type : "PROFILE_RESULT", payload : response.data } )
          })
          .catch(function (error) {
            return dispatch({ type : "PROFILE_ERROR", payload : error } )
          });
         
     }
  }
export function LOGOUT(token){

  localStorage.clear();

  return ({ type : "LOGOUT", payload : "" } )
   
       
   
}

