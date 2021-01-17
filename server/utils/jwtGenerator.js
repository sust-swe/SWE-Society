const jwt = require("jsonwebtoken");

const jwtGenerator = (mydata, expire) => {
  const payload = {
    user: mydata
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: expire });
}
module.exports = jwtGenerator;