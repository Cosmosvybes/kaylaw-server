const jwt = require("jsonwebtoken");

const Authenticator = (req, res, next) => {
  const tkHeader = decodeURIComponent(req.headers["Authorization"]);
  const token = tkHeader.split(" ")[1];

  if (!token) {
    res.send({ response: "sign in to access this page" });
  }
  const tokenData = jwt.verify(token, process.env.api_secret);
  req.user = tokenData;
  next();
};
module.exports = { Authenticator };
