
var home_initialstate ={
    email:"",
    firstname:"",
    status:"",
    msg:"",
    userid:"",
    files:[]
}
export default function(state=home_initialstate,action){
    
    if(action.type === "HOME_RESULT"){
        return{
            ...state,
            status:action.payload.status,
            msg:action.payload.msg,
            firstname:action.payload.firstname,
            email:action.payload.email,
            userid:action.payload.userid    
        }
    }
    if(action.type === "FOLDER_RESULT"){
        return{
            ...state,
            files:action.payload
        }
    }
    if(action.type === "HOME_ERROR"){
        return{
            ...state,
            status:"error",
            msg:"something went wrong",
                 
        }
    }
    if(action.type === "UPLOAD_RESULT"){
        return{
            ...state,
            files:[...state.files,action.payload]
                 
        }
    }
    if(action.type === "LOGOUT"){
        return{
            ...state,
            email:"",
            firstname:"",
            status:"",
            msg:"",
            userid:""
                 
        }
    }
    return state;
}