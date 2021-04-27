const express = require("express");
const employees = require("./controllers/employees");
const areas = require("./controllers/areas");

const router = express.Router();

router.use("/api/employees", employees);
router.use("/api/areas", areas);

module.exports = router;
