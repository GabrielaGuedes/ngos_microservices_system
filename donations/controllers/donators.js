const express = require("express");
const verifyJWT = require("../middleware/verify-jwt");
const Donator = require("../models/donators");

const router = express.Router();

router.get("/", verifyJWT, async (req, res) => {
  const query = {};
  let sort = {};

  if (req.query.city) {
    query.city = req.query.city;
  }

  if (req.query.state) {
    query.state = req.query.state;
  }

  if (req.query.country) {
    query.country = req.query.country;
  }

  if (req.query.minValue) {
    query.donatedValue = { $gte: parseFloat(req.query.minValue) };
  }

  if (req.query.maxValue) {
    if (query.donatedValue) {
      query.donatedValue.$lte = parseFloat(req.query.maxValue);
    } else {
      query.donatedValue = { $lte: parseFloat(req.query.maxValue) };
    }
  }

  if (req.query.sortBy) {
    sort = { [req.query.sortBy]: 1 };
  }

  await Donator.Model.find(query)
    .sort(sort)
    .exec((err, docs) => {
      if (err) return res.status(500).json(err);

      return res.json(docs);
    });
});

module.exports = router;
