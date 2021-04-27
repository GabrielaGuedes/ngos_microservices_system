const express = require("express");
const employees = require("./controllers/employees");
const areas = require("./controllers/areas");
const teams = require("./controllers/teams");

const router = express.Router();

router.use("/api/employees", employees);
router.use("/api/areas", areas);
router.use("/api/teams", teams);

module.exports = router;
