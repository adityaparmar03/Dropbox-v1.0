import axios from 'axios';

var url = "http://localhost:9000/";

export function SignIn(data){
    return  dispatch => {
        console.log(JSON.stringify(data))
        axios.post(url+"signin", data)
          .then(function (response) {
            console.log(JSON.stringify(response))
            return dispatch({ type : "RESULT", payload : response.data } )
          })
          .catch(function (error) {
            return dispatch({ type : "ERROR", payload : error } )
          });
         
     }
}
