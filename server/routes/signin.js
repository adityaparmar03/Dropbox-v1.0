var express = require('express');
var router = express.Router();
var jwt = require('./jwt')


router.get('/', function(req, res, next) {
  
  

});
router.post('/', function(req, res, next) {
  
  var email = req.body.user.email;
  var password = req.body.user.password;
  var token = jwt.generateToken(req.body.user);

  if(email){
    if(password=="1234"){
      res.json({
        response:"success",
        error:"",
        token:token
      })
    }
  }
   
 });

module.exports = router;
