import axios from 'axios';

var url = "http://localhost:9000/";

export function INIT(token){
  return  dispatch => {
      console.log(JSON.stringify(data))
      axios.post(url+"home", token)
        .then(function (response) {
          return dispatch({ type : "HOME_RESULT", payload : response.data } )
        })
        .catch(function (error) {
          return dispatch({ type : "HOME_ERROR", payload : error } )
        });
       
   }
}

export function SignIn(data){
    return  dispatch => {
        console.log(JSON.stringify(data))
        axios.post(url+"signin", data)
          .then(function (response) {
            return dispatch({ type : "SIGNIN_RESULT", payload : response.data } )
          })
          .catch(function (error) {
            return dispatch({ type : "SIGNIN_ERROR", payload : error } )
          });
         
     }
}
