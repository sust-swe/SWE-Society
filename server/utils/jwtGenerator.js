const jwt = require("jsonwebtoken");

const jwtGenerator = (user_id,expire)=> {
  const payload = {
    user: {
      id: user_id
    }
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: expire });
}
module.exports = jwtGenerator;