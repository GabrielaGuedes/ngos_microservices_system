const express = require("express");
const configs = require("./controllers/configs");

const router = express.Router();

router.use("/api/configs", configs);

module.exports = router;
