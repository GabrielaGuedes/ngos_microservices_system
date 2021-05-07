const express = require("express");
const sequelize = require("../config/db-connection");
const verifyJWT = require("../middleware/verify-jwt");

const Transaction = require("../models/transactions");
const { getTotalValue } = require("./utils/get-total-value");

const router = express.Router();

router.get("/current-value", verifyJWT, async (req, res) => {
  await Transaction.Model.findAll()
    .then((result) => res.json({ currentValue: getTotalValue(result) }))
    .catch((error) => res.status(500).json(error));
});

router.get("/recurrent-transactions", verifyJWT, async (req, res) => {
  await Transaction.Model.findAll({
    attributes: [
      "kind",
      [sequelize.fn("SUM", sequelize.col("value")), "totalValue"],
    ],
    group: ["kind"],
    where: { recurrent: true, canceledAt: null },
  })
    .then((result) => {
      const inResult = result.find((r) => r.kind === "IN");
      const outResult = result.find((r) => r.kind === "OUT");
      const allIns = inResult ? inResult.dataValues.totalValue : 0;
      const allOuts = outResult ? outResult.dataValues.totalValue : 0;

      return res.json({ currentValue: allIns - allOuts });
    })
    .catch((error) => res.status(500).json(error));
});

router.get("/all-origins", verifyJWT, async (req, res) => {
  await Transaction.Model.findAll({
    attributes: ["origin"],
  })
    .then((result) => res.json([...new Set(result.map((r) => r.origin))]))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
