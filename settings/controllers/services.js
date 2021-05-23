const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const verifyJWT = require("../middleware/verify-jwt");
const Service = require("../models/services");

const router = express.Router();
const { validate } = new Validator();

router.get("/", verifyJWT, async (req, res) => {
  await Service.Model.findOne({ current: true }).exec((err, docs) => {
    if (err) return res.status(500).json(err);

    return res.json(
      docs || {
        donations: true,
        employees: true,
        financialControl: true,
        invoices: true,
        marketing: true,
        projects: true,
        reports: true,
        volunteers: true,
      }
    );
  });
});

router.post(
  "/",
  validate({ body: Service.jsonSchema }),
  verifyJWT,
  async (req, res) => {
    await Service.Model.findOneAndUpdate({ current: true }, req.body, {
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
