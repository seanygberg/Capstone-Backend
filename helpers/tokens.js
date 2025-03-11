const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

/** return signed JWT from user data. */

function createToken(user) {
  let payload = {
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin || false,
  };

  return jwt.sign(payload, jwtSecret);
}

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user; 
    next();
  });
};


module.exports = { createToken, authenticateToken };
