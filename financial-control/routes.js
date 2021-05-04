const express = require("express");
const transactions = require("./controllers/transactions");

const router = express.Router();

router.use("/api/transactions", transactions);

module.exports = router;
