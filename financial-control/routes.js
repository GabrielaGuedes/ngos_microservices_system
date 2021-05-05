const express = require("express");
const transactions = require("./controllers/transactions");
const groupedTransactions = require("./controllers/grouped-transactions");
const totals = require("./controllers/totals");

const router = express.Router();

router.use("/api/transactions", transactions);
router.use("/api/grouped-transactions", groupedTransactions);
router.use("/api/totals", totals);

module.exports = router;
