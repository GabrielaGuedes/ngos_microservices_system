const express = require("express");
const sequelize = require("../config/db-connection");
const verifyJWT = require("../middleware/verify-jwt");

const Transaction = require("../models/transactions");

const router = express.Router();

router.get("/by-origin", verifyJWT, async (req, res) => {
  const query = { where: {} };
  if (req.query.kind) query.where.kind = req.query.kind;

  await Transaction.Model.findAll({
    attributes: [
      "origin",
      [sequelize.fn("SUM", sequelize.col("value")), "totalValue"],
    ],
    group: ["origin"],
    ...query,
  })
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
