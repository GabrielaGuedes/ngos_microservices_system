const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const verifyJWT = require("../middleware/verify-jwt");
const Detail = require("../models/details");
const { detailsDefault } = require("../utils/default-values");

const router = express.Router();
const { validate } = new Validator();

router.get("/", async (req, res) => {
  await Detail.Model.findOne({ current: true }).exec((err, docs) => {
    if (err) return res.status(500).json(err);

    return res.json(docs || detailsDefault);
  });
});

router.post(
  "/",
  validate({ body: Detail.jsonSchema }),
  verifyJWT,
  async (req, res) => {
    await Detail.Model.findOneAndUpdate({ current: true }, req.body, {
      upsert: true,
      useFindAndModify: false,
      returnOriginal: false,
      runValidators: true,
      context: "query",
    })
      .then(async (result) => res.json(result))
      .catch((err) => res.status(500).json(err));
  }
);

module.exports = router;
