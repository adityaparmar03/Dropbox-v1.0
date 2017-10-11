var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var sql = require('./sql')
const secrete_key = "4ADI2RAJ0PAR3"

var insert = "INSERT INTO ";
var userdata ="`dropbox`.`userdata` ";

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
        
        var check_user = "SELECT * FROM"+userdata+"where email='"+email+"' and password='"+password+"'";       
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
                        userid:rows[0].userid,
                        firstname:rows[0].firstname,
                        email:rows[0].email
                      })
                }
            }).catch((err) => setImmediate(() => { 
                throw err;
        })); 
    }
  });
})



module.exports = router;
