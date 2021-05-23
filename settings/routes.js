const express = require("express");
const services = require("./controllers/services");
const details = require("./controllers/details");

const router = express.Router();

router.use("/api/services", services);
router.use("/api/details", details);

module.exports = router;
