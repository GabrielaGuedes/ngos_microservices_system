const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const verifyJWT = require("../middleware/verify-jwt");
const Invoice = require("../models/invoices");

const router = express.Router();
const { validate } = new Validator();

router.get("/", verifyJWT, async (req, res) => {
  const query = {};
  if (req.query.minDate) {
    query.donationDate = {
      ...query.donationDate,
      $gte: new Date(req.query.minDate),
    };
  }

  if (req.query.maxDate) {
    query.donationDate = {
      ...query.donationDate,
      $lte: new Date(req.query.maxDate),
    };
  }

  await Invoice.Model.find(query).exec((err, docs) => {
    if (err) return res.status(500).json(err);

    return res.json(docs || []);
  });
});

router.get("/:id", verifyJWT, async (req, res) => {
  await Invoice.Model.findOne({ _id: req.params.id }).exec((err, docs) => {
    if (err) return res.status(500).json(err);

    return res.json(docs || {});
  });
});

router.post(
  "/",
  validate({ body: Invoice.jsonSchema }),
  verifyJWT,
  async (req, res) => {
    const newInvoice = new Invoice.Model(req.body);

    await newInvoice
      .save()
      .then((result) => res.json(result))
      .catch((err) => res.status(500).json(err));
  }
);

router.put(
  "/:id",
  validate({ body: Invoice.jsonSchema }),
  verifyJWT,
  async (req, res) => {
    await Invoice.Model.findOneAndUpdate({ _id: req.params.id }, req.body, {
      useFindAndModify: false,
      returnOriginal: false,
      runValidators: true,
      context: "query",
    })
      .then(async (result) => res.json(result))
      .catch((err) => res.status(500).json(err));
  }
);

router.delete("/:id", verifyJWT, async (req, res) => {
  await Invoice.Model.deleteOne({ _id: req.params.id })
    .then(() => res.json({ message: "Destroyed!" }))
    .catch((error) =>
      res.status(500).json({
        message: "An error occured. Are you sure the id is correct?",
        error,
      })
    );
});

module.exports = router;
