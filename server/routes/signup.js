var express = require('express');
var router = express.Router();
var sql = require('./sql')
var bcrypt = require('bcrypt');

// Create a password salt
//var salt = bcrypt.genSaltSync(10);
var bsalt = require('./const')

var insert = "INSERT INTO ";
var userdata ="`dropbox`.`userdata` ";
var content ="`dropbox`.`content` ";
router.get('/', function(req, res, next) {
 

});
router.post('/', function(req, res, next) {
  function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};
 
var date = Date().toString();

  var firstname = req.body.user.firstname;
  var lastname = req.body.user.lastname;
  var email = req.body.user.email;
  var password = req.body.user.password;
  //console.log("salt"+bsalt.getsalt())
  var passwordToSave = bcrypt.hashSync(password, bsalt.getsalt())

  var check_user = "SELECT * FROM"+userdata+"where email='"+email+"'";

  var insert_user = insert+userdata+"(`email`, \
  `password`, `firstname`, `lastname`) \
   VALUES ('"+email+"','"+passwordToSave+"','"+firstname+"','"+lastname+"');"

  sql.execute_read_query(check_user).then(function(rows){
   
      if(rows.length === 0){
          sql.execute_query_with_ID(insert_user).then(function(rows) {
            if(rows){
              var root = insert+content+"(`originalname`, \
              `virtualname`, `date`, `type`,`star`,`userid`) \
               VALUES ('root','root','"+date+"','folder','NO','"+parseInt(rows)+"');"

              sql.execute_query(root).then(function(rows){
                  if(rows){
                    res.json({
                    status:"success",
                    msg:"Account created successfully."
                  })
                  }
                  else{
                    res.json({
                      status:"error",
                      msg:"Something went wrong, Please contact us."
                    })
                  }
              })
              }
             
            })
          .catch((err) => setImmediate(() => { 
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
