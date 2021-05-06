const express = require("express");
const transactions = require("./controllers/transactions");
const groupedTransactions = require("./controllers/grouped-transactions");
const totals = require("./controllers/totals");
const goals = require("./controllers/goals");

const router = express.Router();

router.use("/api/transactions", transactions);
router.use("/api/grouped-transactions", groupedTransactions);
router.use("/api/totals", totals);
router.use("/api/goals", goals);

module.exports = router;
