const jwt = require("jsonwebtoken");

const EXPIRATION_TIME = 60 * 60 * 24;

const token = (id) =>
  jwt.sign({ result: id }, process.env.SECRET, {
    expiresIn: EXPIRATION_TIME,
  });

module.exports = token;
