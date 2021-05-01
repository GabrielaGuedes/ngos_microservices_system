const express = require("express");
const projects = require("./controllers/projects");

const router = express.Router();

router.use("/api/projects", projects);

module.exports = router;
