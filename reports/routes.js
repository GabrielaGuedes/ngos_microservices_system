const express = require("express");
const configs = require("./controllers/configs");
const reports = require("./controllers/reports");

const router = express.Router();

router.use("/api/configs", configs);
router.use("/api/reports", reports);

module.exports = router;
