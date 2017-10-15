var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var sql = require('./sql')
const secrete_key = "4ADI2RAJ0PAR3"

var insert = "INSERT INTO ";
var userdata ="`dropbox`.`userdata` ";
var content ="`dropbox`.`content` "

router.get('/', function(req, res, next) {
  
  

});
router.post('/root', function(req, res, next) {
    
    var userid = req.body.userid;
   
 
         
        var getrootid = "SELECT contentid FROM dropbox.content where originalname = 'root' and userid = "+userid
        sql.execute_read_query(getrootid)
          .then(function(rows){
              
                 if(rows.length === 0){
                   res.json({
                     status:"success",
                     msg:"No Content."
                   })
                  }
                  else{
                     
                      res.json({
                          contentid:rows[0].contentid,
                          userid:userid})
                  }
              })
          .catch((err) => setImmediate(() => { 
            res.json({
                status:"error",
                msg:"Something went wrong, Try again."
              })
          }))
  
});
router.post('/', function(req, res, next) {
  
  var userid = req.body.userid;
  
       
        var getcontent = "SELECT * FROM dropbox.content where contentid in\
        (SELECT child_content_id FROM dropbox.content_mapping where userid = '1' and parent_content_id=\
        (SELECT contentid FROM dropbox.content where originalname='root' and userid='1'))"
        sql.execute_read_query(getcontent)
        .then(function(rows){
            
               if(rows.length === 0){
                 res.json({
                   status:"success",
                   msg:"No Content."
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
                    res.json(content)
                }
            })
        .catch((err) => setImmediate(() => { 
                throw err;
        }))

    })
    router.post('/load', function(req, res, next) {
        
        var userid = req.body.userid;
        var contentid = req.body.folderid;
        console.log("contentid"+contentid)
           /*
             ORIGINAL BEFORE SHARING

              var getcontent = "SELECT * FROM dropbox.content where contentid in\
              (SELECT child_content_id FROM dropbox.content_mapping where userid = '"+userid+"' and parent_content_id=\
              (SELECT contentid FROM dropbox.content where contentid='"+contentid+"' and userid='"+userid+"'))"
          
           
           */
              var getcontent = "SELECT * FROM dropbox.content where contentid in\
              (SELECT child_content_id FROM dropbox.content_mapping where  parent_content_id=\
              (SELECT contentid FROM dropbox.content where contentid='"+contentid+"'))"
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
                                    currentfolderid:contentid
                                   })
                      }
                  })
              .catch((err) => setImmediate(() => { 
                      //throw err;
                      res.json({
                        status:"error",
                        msg:"Something went wrong."
                   })
              }))
      
          })
    
    router.post('/create', function(req, res, next) {
      
            var userid = req.body.userid;
            var foldername = req.body.foldername;
            var parentfolderid = req.body.parentfolderid;

            var insertfolder = "";
            var getfolderid="";
            var insertmapping=""
        
            sql.execute_query(insert_user).then(function(rows) {
                
              if(rows){

                     sql.execute_read_query(check_user).then(function(rows){
                
                            if(rows.length === 0){

                                sql.execute_query(insert_user).then(function(rows) {

                                    if(rows){
                                         res.json({
                                             status:"success",
                                            msg:"Account created successfully."
                                        })
                                    }
                                })
                                .catch((err) => setImmediate(() => { 
                                    throw err;
                                  })); 
                            }
                        })
                        .catch((err) => setImmediate(() => { 
                            throw err;
                          })); 
                    }
                })
                .catch((err) => setImmediate(() => { 
                    throw err;
                  }));        

        })
module.exports = router;
