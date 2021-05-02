const express = require("express");
const projects = require("./controllers/projects");
const totalExpected = require("./controllers/total-expected");

const router = express.Router();

router.use("/api/projects", projects);
router.use("/api/total-expected", totalExpected);

module.exports = router;
