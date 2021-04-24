const express = require("express");
const users = require("./controllers/users");

const router = express.Router();

router.use("/api", users);

module.exports = router;
