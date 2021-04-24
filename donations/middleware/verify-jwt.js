const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  return jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.result;
    return next();
  });
};

module.exports = verifyJWT;
