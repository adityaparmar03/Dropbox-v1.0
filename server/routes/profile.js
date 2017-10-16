var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var sql = require('./sql')
const secrete_key = "4ADI2RAJ0PAR3"

var insert = "INSERT INTO ";
var userdata ="`dropbox`.`userdata` ";
var bcrypt = require('bcrypt');
router.get('/', function(req, res, next) {
  
  

});
router.post('/', function(req, res, next) {
 
  var token = req.body.token;
 
  jwt.verify(token, secrete_key, function(err, user) {
    if (err) {
      return res.json({
       status:"error",
       msg:"token is not verified."
      });
    } else {
        var email = user.email;
        var password = user.password;
    
        var check_user = "SELECT * FROM"+userdata+"where email='"+email+"'";       
        sql.execute_read_query(check_user).then(function(rows){
            
               if(rows.length === 0){
                 res.json({
                   status:"error",
                   msg:"Account does not exist."
                 })
                }
                else{
                    res.json({
                        status:"success",
                        msg:"token verified successfully",
                        email:rows[0].email,
                        password:rows[0].password,
                        userid:rows[0].userid,
                        firstname:rows[0].firstname,
                        lastname:rows[0].lastname,
                        aboutme:rows[0].aboutme,
                        interests:rows[0].interests

                      })
                }
            }).catch((err) => setImmediate(() => { 
                throw err;
        })); 
    }
  });
})

router.post('/update', function(req, res, next) {
    
   
    var email = req.body.user.email;
    var password = req.body.user.password;
    var firstname = req.body.user.firstname;
    var lastname = req.body.user.lastname;
    var aboutme = req.body.user.aboutme;
    var interests = req.body.user.interests;
    var userid = req.body.user.userid;
    var isPasswordChanged=req.body.user.isPasswordChanged

  
     /*console.log("userid+"+userid)
     var getsalt = "SELECT salt FROM"+userdata+"where userid='"+userid+"'";       
     sql.execute_read_query(getsalt).then(function(rows){
       
        if(rows.length === 0){
          res.json({
            status:"error",
            msg:"Something went wrong, Try next time."
          })
        }else{
          if(isPasswordChanged==="YES")
            password =  bcrypt.hashSync(password, rows[0].salt);*/
          
          var update_user = "UPDATE "+userdata+"SET \
          `firstname`='"+firstname+"', \
          `lastname`='"+lastname+"', \
          `aboutme`='"+aboutme+"', \
          `interests`='"+interests+"' \
           WHERE `userid`='"+userid+"';"
           
          sql.execute_query(update_user).then(function(rows){
            
            if(rows){
              res.json({
                status:"success",
                msg:"Account updated successfully."
              })
            }
            else{
              res.json({
                  status:"error",
                  msg:"Data is not updated."
                })
            }
       

      }).catch((err) => setImmediate(() => { 
        throw err;
      })); 
     
         
        
       
   })

module.exports = router;
