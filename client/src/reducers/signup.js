var signup_initialstate ={
    response:"",
    error:""
}

export default function(state=signup_initialstate,action){
    
    if(action.type === "RESULT"){
        return{
            ...state,
            response:action.payload,
           
            
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
