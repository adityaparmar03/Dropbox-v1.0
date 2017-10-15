var express = require('express');
var router = express.Router();
var jwt = require('./jwt')
var sql = require('./sql')

var insert = "INSERT INTO ";
var userdata ="`dropbox`.`userdata` ";

var bcrypt = require('bcrypt');

// Create a password salt
var salt = bcrypt.genSaltSync(10);


router.get('/', function(req, res, next) {
  
  

});
router.post('/', function(req, res, next) {
  
  var email = req.body.user.email;
  var password = req.body.user.password.trim();
 
  var check_user = "SELECT * FROM"+userdata+"where email='"+email+"'";
  var token = jwt.generateToken(req.body.user);

  sql.execute_read_query(check_user).then(function(rows){
   
      if(rows.length === 0){
        res.json({
          status:"error",
          msg:"Account does not exist.",
          token:""
        })
        }
        else{
          var actualpassword = bcrypt.hashSync(rows[0].password, salt)
          console.log(actualpassword)
          if(actualpassword === password){
            res.json({
              status:"success",
              msg:"you are successfully signin",
              token:token
            })
          }else{
            res.json({
              status:"error",
              msg:"Password is wrong.",
              token:""
            })
          }
         
        }
      }).catch((err) => setImmediate(() => { 
        throw err;
      })); 
            
            
  }); 

module.exports = router;
