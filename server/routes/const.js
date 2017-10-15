var bcrypt = require('bcrypt');

 let salt = bcrypt.genSaltSync(10);
 function getsalt(){
     return salt;
 }
 module.exports = {
    getsalt:getsalt
  }