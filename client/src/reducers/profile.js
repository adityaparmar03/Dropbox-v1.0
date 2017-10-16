var profile_initialstate ={
    email:"",
    password:"",
    firstname:"",
    lastname:"",
    aboutme:"",
    interests:"",
    status:"",
    msg:"",
    userid:""
}
export default function(state=profile_initialstate,action){
    
    if(action.type === "PROFILE_RESULT"){
        return{
            ...state,
            status:action.payload.status,
            msg:action.payload.msg,
            firstname:action.payload.firstname,
            lastname:action.payload.lastname,
            email:action.payload.email,
            password:action.payload.password,
            aboutme:action.payload.aboutme,
            interests:action.payload.interests,
            userid:action.payload.userid    
        }
    }
    if(action.type === "PROFILE_ERROR"){
        return{
            ...state,
            status:"error",
            msg:"something went wrong",
                 
        }
    }
    if(action.type === "UPDATE_RESULT"){
        return{
            ...state,
            status:action.payload.status,
            msg:action.payload.msg,
                 
        }
    }
    
    if(action.type === "LOGOUT"){
        return{
            ...state,
            email:"",
            password:"",
            firstname:"",
            lastname:"",
            aboutme:"",
            interests:"",
            status:"",
            msg:"",
            userid:""
                 
        }
    }
    return state;
}