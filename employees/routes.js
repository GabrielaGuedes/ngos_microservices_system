const express = require("express");
const employees = require("./controllers/employees");

const router = express.Router();

router.use("/api/employees", employees);

module.exports = router;
