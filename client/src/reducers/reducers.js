import {combineReducers} from 'redux'
import signin from './signin';
import signup from './signup';
import home from './home';
import profile from './profile';
import activitylog from './activitylog'
export default combineReducers({

   
    signup,
    signin,
    home,
    profile,
    activitylog
    

});

