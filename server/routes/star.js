
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
  
 var value = req.body.value;
 var contentid = req.body.contentid;

var updatestar="UPDATE `dropbox`.`content` SET `star`='"+value+"' WHERE `contentid`='"+contentid+"'";
        
 sql.execute_query(updatestar).then(function(rows){
            
               if(rows){
                 res.json({
                   status:"error",
                   msg:"Star is not updated."
                 })
                }
                else{
                    res.json({
                        status:"success",
                        msg:"star is successfully updated.",
                      })
                }
            }).catch((err) => setImmediate(() => { 
                throw err;
        }))
})





module.exports = router;
