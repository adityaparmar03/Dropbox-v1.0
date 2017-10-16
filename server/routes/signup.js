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

  var firstname = req.body.user.firstname.trim();
  var lastname = req.body.user.lastname.trim();
  var email = req.body.user.email.trim();
  var password = req.body.user.password.trim();
  //console.log("salt"+bsalt.getsalt())
  var salt = bsalt.getsalt();
  var passwordToSave = bcrypt.hashSync(password,salt)

  var check_user = "SELECT * FROM"+userdata+"where email='"+email+"'";

  var insert_user = insert+userdata+"(`email`, \
  `password`,`salt`, `firstname`, `lastname`) \
   VALUES ('"+email+"','"+passwordToSave+"','"+salt+"','"+firstname+"','"+lastname+"');"

  sql.execute_read_query(check_user).then(function(rows){
   
      if(rows.length === 0){
          sql.execute_query_with_ID(insert_user).then(function(rows) {
            if(rows){
              var userid = parseInt(rows);
              var root = insert+content+"(`originalname`, \
              `virtualname`, `date`, `type`,`star`,`userid`) \
               VALUES ('root','root','"+date+"','folder','NO','"+userid+"');"

              sql.execute_query(root).then(function(rows){
                  if(rows){
                   
                    var actmsg = "Account is successfully created."
                    var activityquery = "INSERT INTO\
                    `dropbox`.`activity_log` (`msg`, `date`,`userid`) \
                    VALUES ('"+actmsg+"','"+date+"', '"+userid+"')"
                    
                    sql.execute_query(activityquery).then(function(rows) {
                        if(rows){
                          res.json({
                              content:content,
                              status:"success",
                              msg:"Account is successfully created."
                          });
                        }
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
        res.json({
          status:"error",
          msg:"something went wrong.",
          token:""
        })
      })); 
            
  }); 
  
 

module.exports = router;
