import axios from 'axios';

var url = "http://localhost:9000/";

export function SignUp(data){
    return  dispatch => {
        axios.post(url+"signup", data)
          .then(function (response) {
            return dispatch({ type : "RESULT", payload : response.data } )
          })
          .catch(function (error) {
            return dispatch({ type : "ERROR", payload : error } )
          });
         
     }
}
