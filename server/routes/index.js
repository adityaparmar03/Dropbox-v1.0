var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

function generateToken(user) {
  var u = {
   name: user.name,
   username: user.username,
   admin: user.admin,
   _id: user._id.toString(),
   image: user.image
  };
  return token = jwt.sign(u, process.env.JWT_SECRET, {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
