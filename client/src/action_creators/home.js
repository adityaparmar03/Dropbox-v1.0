import axios from 'axios';

var url = "http://localhost:9000/";


export function INIT(token,initialfolder){
  return (dispatch) => {
    axios.post(url+"home", {"token":token}).then((response)=>{
     dispatch({ type : "HOME_RESULT", payload : response.data } )
     axios.post(url+"folder/root", {"userid":response.data.userid}).then((response)=>{
      dispatch({ type : "ROOT_RESULT", payload : response.data } )
        axios.post(url+"folder/load", {"userid":response.data.userid,"folderid":response.data.contentid}).then((response)=>{
          return dispatch({ type : "FOLDER_RESULT", payload : response.data } )
       })
          }).catch(function (error) {
            return dispatch({ type : "HOME_ERROR", payload : error } )
          });
        })
   }
}
export function INITLOADFOLDER(token,folderid){
  return (dispatch) => {
    axios.post(url+"home", {"token":token}).then((response)=>{
      dispatch({ type : "HOME_RESULT", payload : response.data } )
        axios.post(url+"folder/load", {"userid":response.data.userid,"folderid":folderid}).then((response)=>{
              return dispatch({ type : "FOLDER_RESULT", payload : response.data } )
         
        }).catch(function (error) {
            return dispatch({ type : "HOME_ERROR", payload : error } )
          });
        })
  }
}
 
 

export function LOADFOLDER(userid,folderid){
  return (dispatch) => {
    sessionStorage.fname = folderid;
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

  export function UploadFolder(parent,child,userid){
    if(child!=="")
    return  dispatch => {
       
        axios.post(url+"upload/createfolder", {"folderid":parent,"foldername":child,"userid":userid})
          .then(function (response) {
            return dispatch({ type : "CREARE_FOLDER_RESULT", payload : response.data } )
          })
          .catch(function (error) {
            return dispatch({ type : "CREARE_FOLDER_RESULT", payload : error } )
          });
         
     }
     else{
      return { type : "CREARE_FOLDER_ERROR", payload : {status:'error',msg:'folder name can not be blank.'} } 
       
     }
}