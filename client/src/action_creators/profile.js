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
export function UPDATE(email,password,firstname,lastname,aboutme,interests,userid,isPasswordChanged){
 
    return  dispatch => {
       
        axios.post(url+"profile/update", {user:{
          email:email,
          password:password,
          firstname:firstname,
          lastname:lastname,
          aboutme:aboutme,
          interests:interests,
          userid : userid,
          isPasswordChanged:isPasswordChanged
        }})
          .then(function (response) {
            return dispatch({ type : "UPDATE_RESULT", payload : response.data } )
          })
          .catch(function (error) {
            return dispatch({ type : "PROFILE_ERROR", payload : error } )
          });
         
     }
  }
export function LOGOUT(token){

  localStorage.clear();
  sessionStorage.clear();
  return ({ type : "LOGOUT", payload : "" } )
   
       
   
}

