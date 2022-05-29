const jwt = require("jsonwebtoken");

const generateUserToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

module.exports = generateUserToken;
