import axios from 'axios';

var url = "http://localhost:9000/";


export function INIT(token,initialfolder){
  return (dispatch) => {
    axios.post(url+"home", {"token":token}).then((response)=>{
     dispatch({ type : "HOME_RESULT", payload : response.data } )
      axios.post(url+"folder", {"userid":response.data.userid,"foldername":initialfolder}).then((response)=>{
              return dispatch({ type : "FOLDER_RESULT", payload : response.data } )
          })
        }).catch(function (error) {
            return dispatch({ type : "HOME_ERROR", payload : error } )
          });
  }
}
export function LOADFOLDER(userid,folderid){
  return (dispatch) => {

        axios.post(url+"folder/load", {"userid":userid,"folderid":folderid}).then((response)=>{
              return dispatch({ type : "FOLDER_RESULT", payload : response.data } )
         
        }).catch(function (error) {
            return dispatch({ type : "HOME_ERROR", payload : error } )
          });
  }
 
}
export function CREATFOLDER(userid,folderid){
  
    }

export function LOGOUT(token){

  localStorage.clear();

  return ({ type : "LOGOUT", payload : "" } )
   
       
   
}

export function UploadFile(payload){
  return  dispatch => {
      
      axios.post(url+"upload", payload)
        .then(function (response) {
          return dispatch({ type : "UPLOAD_RESULT", payload : response.data } )
        })
        .catch(function (error) {
          return dispatch({ type : "UPLOAD_ERROR", payload : error } )
        });
       
   }
}