
var signin_initialstate ={
    response:"",
    error:"",
    token:""
}
export default function(state=signin_initialstate,action){
    
    if(action.type === "RESULT"){
        return{
            ...state,
            response:action.payload.response,
            token:action.payload.token
           
            
        }
    }
    if(action.type === "ERROR"){
        return{
            ...state,
            error:action.payload,
            
        }
    }
    
    
    return state;
}