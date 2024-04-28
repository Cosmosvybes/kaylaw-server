const jwt = require("jsonwebtoken");

const Authenticator = (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) {
    res.send({ response: "sign in to access this page" });
  }
  const tokenData = jwt.verify(token, process.env.api_secret);
  req.user = tokenData;
  next();
};
module.exports = { Authenticator };
