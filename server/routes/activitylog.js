var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var sql = require('./sql')
const secrete_key = "4ADI2RAJ0PAR3"


var activitylog ="`dropbox`.`activity_log` ";
var userdata ="`dropbox`.`userdata` ";
router.get('/', function(req, res, next) {
  
  res.send("activity")

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
      
        
        var check_user = "SELECT * FROM"+userdata+"where email='"+email+"'";       
        sql.execute_read_query(check_user).then(function(rows){
            
               if(rows.length === 0){
                 res.json({
                   status:"error",
                   msg:"Account does not exist."
                 })
                }
                else{
                    
                   var userid=rows[0].userid;
                   
                   var getactivity = "SELECT * FROM"+activitylog+"where userid='"+userid+"' ORDER BY activity_log_id DESC";
                   sql.execute_read_query(getactivity).then(function(rows){
                    if(rows.length === 0){
                        res.json({
                          status:"error",
                          msg:"No Activities"
                        })
                       }
                    else{
                        var activity = rows.map((item,i)=>{
                            return ({
                              msg:item.msg,
                              date:item.date,
                              
                            })
                        })
                        console.log("success"+JSON.stringify(activity));
                        res.json({
                           
                            activity:activity,
                            status:"success",
                            msg:"Activity Load successfully."
                          })
                    }   
                   })
                      
                }
            }).catch((err) => setImmediate(() => { 
                throw err;
        })); 
    }
  });
})


module.exports = router;
