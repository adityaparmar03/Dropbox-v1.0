
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
 //var sender_userid = req.body.userid;

 var getuserid = "SELECT userid from"+userdata+"where email='"+email+"'";
 
 
console.log("contentid"+contentid)
 
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
                                res.json({
                                    status:"success",
                                    msg:"Content has shared successfully"
                    
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
            
            }).catch((err) => setImmediate(() => { 
                throw err;
        }))
})





module.exports = router;
