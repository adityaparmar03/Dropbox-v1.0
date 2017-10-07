var express = require('express');
var router = express.Router();
var sql = require('./sql')


var insert = "INSERT INTO ";
var userdata ="`dropbox`.`userdata` ";
router.get('/', function(req, res, next) {
 

});
router.post('/', function(req, res, next) {
  
  var firstname = req.body.user.firstname;
  var lastname = req.body.user.lastname;
  var email = req.body.user.email;
  var password = req.body.user.password;

  var query = insert+userdata+"(`email`, \
  `password`, `firstname`, `lastname`) \
   VALUES ('"+email+"','"+password+"','"+firstname+"','"+lastname+"');"
  console.log(query);
  sql.execute_query(query).then(function(rows) {
      if(rows){
        res.json({
          response:"success",
          error:""
        })
      }
    }).catch((err) => setImmediate(() => { 
      res.json({
        response:"",
        error:"error"
      })
     })); // Throw async to escape the promise chain
  
 
   
 });

module.exports = router;
