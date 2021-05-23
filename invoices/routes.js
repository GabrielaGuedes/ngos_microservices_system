const express = require("express");
const invoices = require("./controllers/invoices");

const router = express.Router();

router.use("/api/invoices", invoices);

module.exports = router;
