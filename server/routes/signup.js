var express = require('express');
var router = express.Router();
var sql = require('./sql')


var insert = "INSERT INTO ";
var userdata ="`dropbox`.`userdata` ";
router.get('/', function(req, res, next) {
 

});
router.post('/', function(req, res, next) {
  
  var firstname = req.body.user.firstname;
  var lastname = req.body.user.lastname;
  var email = req.body.user.email;
  var password = req.body.user.password;

  var check_user = "SELECT * FROM"+userdata+"where email='"+email+"'";

  var insert_user = insert+userdata+"(`email`, \
  `password`, `firstname`, `lastname`) \
   VALUES ('"+email+"','"+password+"','"+firstname+"','"+lastname+"');"

  sql.execute_read_query(check_user).then(function(rows){
   
      if(rows.length === 0){
          sql.execute_query(insert_user).then(function(rows) {
            if(rows){
              res.json({
                status:"success",
                msg:"Account created successfully."
              })
            }
          }).catch((err) => setImmediate(() => { 
            res.json({
              status:"error",
              msg:"Data is not inserted."
            })
          })); 
        }
        else{
          res.json({
            status:"error",
            msg:"Emaild is already exists."
          })
        }
      }).catch((err) => setImmediate(() => { 
        throw err;
      })); 
            
  }); 
  
 

module.exports = router;
