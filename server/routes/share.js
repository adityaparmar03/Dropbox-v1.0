
var express = require('express');
var router = express.Router();

var sql = require('./sql')


var insert = "INSERT INTO ";
var userdata ="`dropbox`.`userdata` ";
var content ="`dropbox`.`content` ";
var contentmapping="`dropbox`.`content_mapping`";

router.get('/', function(req, res, next) {
  
  

});
router.post('/', function(req, res, next) {
  
 var email = req.body.email;
 var contentid = req.body.contentid;
 var sender_userid = req.body.userid;

 function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};
 
var date = Date().toString();


 var getuserid = "SELECT userid from"+userdata+"where email='"+email+"'";
 
 

 
 sql.execute_read_query(getuserid).then(function(rows){
            
               if(rows.length > 0){
                var recieveruserid =  rows[0].userid;
               
                var getrootid = "SELECT contentid from"+content+"where originalname='root' and userid='"+recieveruserid+"'";
                sql.execute_read_query(getrootid).then(function(rows){
                  
                    if(rows.length > 0){
                        var rootid = rows[0].contentid; 
                        var insertshared = insert+contentmapping+"(`parent_content_id`, `child_content_id`, `shared`, `userid`)\
                        VALUES ('"+rootid+"', '"+contentid+"', 'shared', '"+recieveruserid+"')"
                        
                        sql.execute_query(insertshared).then(function(rows){
                            
                            if(rows){
                                var actmsg = "You have shared file/folder." 
                                var activityquery = "INSERT INTO\
                                `dropbox`.`activity_log` (`msg`, `date`,`userid`) \
                                VALUES ('"+actmsg+"','"+date+"', '"+sender_userid+"')"
                                
                                sql.execute_query(activityquery).then(function(rows) {
                                    if(rows){
                                    res.json({
                                        status:"success",
                                        msg:"Content has shared successfully"
                        
                                    })
                            }
                        })
                        }
                            else{
                                res.json({
                                status:"error",
                                msg:"Content did not shared successfully"
                            })
                            }
                        })
                    }
                    
                })
            }
            else{
                res.json({
                    status:"error",
                    msg:"This is not an valid Email ID/ User."
                })
            }
            
            }).catch((err) => setImmediate(() => { 
                throw err;
        }))
})





module.exports = router;
