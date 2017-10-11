var jwt = require('jsonwebtoken');
const secrete_key = "4ADI2RAJ0PAR3"
function generateToken(user) {

  var user = {
   email : user.email,
   password:user.password
  };
  return token = jwt.sign(user,secrete_key, {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

module.exports = {
  generateToken:generateToken
}