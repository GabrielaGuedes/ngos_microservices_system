const express = require("express");
const services = require("./controllers/services");

const router = express.Router();

router.use("/api/services", services);

module.exports = router;
