var bcrypt = require('bcrypt');

 const salt = bcrypt.genSaltSync(10);
 function getsalt(){
     return salt;
 }
 module.exports = {
    getsalt:getsalt
  }