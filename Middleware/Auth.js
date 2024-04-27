const jwt = require("jsonwebtoken");

const Authenticator = (req, res, next) => {
  const userToken = req.cookies.userToken;
  if (!userToken) {
    res.send({ response: "sign in to access this page" });
  }
  const tokenData = jwt.verify(userToken, process.env.api_secret);
  req.user = tokenData;
  next();
};
module.exports = { Authenticator };
