const express = require("express");
const transactions = require("./controllers/transactions");
const groupedTransactions = require("./controllers/grouped-transactions");

const router = express.Router();

router.use("/api/transactions", transactions);
router.use("/api/grouped-transactions", groupedTransactions);

module.exports = router;
