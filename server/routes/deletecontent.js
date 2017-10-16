var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');

var sql = require('./sql')
var insert = "INSERT INTO ";
var content ="`dropbox`.`content` ";
var content_mapping ="`dropbox`.`content_mapping` ";





router.post('/', function (req, res, next) {

   
   function twoDigits(d) {
        if(0 <= d && d < 10) return "0" + d.toString();
        if(-10 < d && d < 0) return "-0" + (-1*d).toString();
        return d.toString();
    }
    
    Date.prototype.toMysqlFormat = function() {
        return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
    };
     
    var date = Date().toString();

    var userid=req.body.userid;
    var parentid = req.body.parentid;
    var contentid = req.body.contentid;

    var deletecontent =" DELETE FROM `dropbox`.`content` WHERE `contentid`='"+contentid +"'";
    var getowner = "SELECT * FROM dropbox.content where contentid="+contentid;
    
    
    var getcontent = "SELECT * FROM dropbox.content where contentid in\
    (SELECT child_content_id FROM dropbox.content_mapping where  parent_content_id=\
    (SELECT contentid FROM dropbox.content where contentid='"+parentid+"'))"
    
    sql.execute_read_query(getowner)
    .then(function(rows){
        var contentname = rows[0].originalname;
        var type = rows[0].type;
        var actuserid = rows[0].userid;
        if(rows[0].userid == userid)
        {
            sql.execute_query(deletecontent)
            .then(function(rows){
                if(rows){
                    var actmsg = type +" "+contentname + " deleted."  
                    var activityquery = "INSERT INTO\
                    `dropbox`.`activity_log` (`msg`, `date`,`userid`) \
                    VALUES ('"+actmsg+"','"+date+"', '"+actuserid+"')"
                    
                    sql.execute_query(activityquery);

                    sql.execute_read_query(getcontent)
                    .then(function(rows){
                        
                           if(rows.length === 0){
                             var content=[{
                                  type:"nocontent",
                                  msg:"No Content.",
                                  
                              }]
                              
                             res.json({
                              content:content,
                              currentfolderid:contentid,
                              status:"success",
                              msg:"Delete successfully Done."
                             })
                            }
                            else{
                                var content = rows.map((item,i)=>{
                                  return ({contentid:item.contentid,
                                    originalname:item.originalname,
                                    virtualname:item.virtualname,
                                    date:item.date,
                                    type:item.type,
                                    star:item.star
                                  })
                                })
                                res.json({
                                          content:content,
                                          currentfolderid:parentid,
                                          status:"success",
                                          msg:"Delete successfully Done."
                                         })
                            }
                        })
                
                }
                else
                {
                    sql.execute_read_query(getcontent)
                    .then(function(rows){
                        
                           if(rows.length === 0){
                             var content=[{
                                  type:"nocontent",
                                  msg:"No Content."
                              }]
                              
                             res.json({
                              content:content,
                              currentfolderid:contentid,
                              status:"error",
                              msg:"Delete is not done."
                             })
                            }
                            else{
                                var content = rows.map((item,i)=>{
                                  return ({contentid:item.contentid,
                                    originalname:item.originalname,
                                    virtualname:item.virtualname,
                                    date:item.date,
                                    type:item.type,
                                    star:item.star
                                  })
                                })
                                res.json({
                                          content:content,
                                          currentfolderid:parentid,
                                          status:"error",
                                          msg:"Delete is not done."
                                         })
                            }
                        })
                
                }
            })   
            
        }
        else
        {
            sql.execute_read_query(getcontent)
            .then(function(rows){
                
                   if(rows.length === 0){
                     var content=[{
                          type:"nocontent",
                          msg:"No Content."
                      }]
                      
                     res.json({
                      content:content,
                      currentfolderid:contentid,
                      status:"error",
                      msg:"You are not authorize to perform delete."
                     })
                    }
                    else{
                        var content = rows.map((item,i)=>{
                          return ({contentid:item.contentid,
                            originalname:item.originalname,
                            virtualname:item.virtualname,
                            date:item.date,
                            type:item.type,
                            star:item.star
                          })
                        })
                        res.json({
                                  content:content,
                                  currentfolderid:parentid,
                                  status:"error",
                                  msg:"You are not authorize to perform delete."
                                 })
                    }
                })
        
        }}).catch((err) => setImmediate(() => { 
            //throw err;
            res.json({
              status:"error",
              msg:"Something went wrong."
         })
    }))

})
 
module.exports = router;

//Ref: https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef