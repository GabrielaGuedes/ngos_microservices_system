const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const CreditCardDonation = require("../models/credit-card-donations");
const BoletoDonation = require("../models/boleto-donations");
const ChargeCreditCardOrganizer = require("../interactors/charge-credit-card-organizer");
const donators = require("../models/donators");
const Donation = require("../models/donations");
const ChargeBoletoOrganizer = require("../interactors/charge-boleto-organizer");
const verifyJWT = require("../middleware/verify-jwt");

const router = express.Router();

const { validate } = new Validator();

router.post(
  "/charge-credit-card",
  validate({
    body: {
      allOf: [CreditCardDonation.jsonSchema, donators.jsonSchema],
    },
  }),
  async (req, res, next) => {
    await ChargeCreditCardOrganizer.run({
      chargeInfo: {
        creditCardNumber: req.body.creditCardNumber,
        cvv: req.body.cvv,
        donatedValue: req.body.donatedValue,
        expireMonth: req.body.expireMonth,
        expireYear: req.body.expireYear,
        name: req.body.name,
      },
      donatorInfo: {
        name: req.body.name,
        birthDate: req.body.birthDate,
        motivation: req.body.motivation,
        occupation: req.body.occupation,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        email: req.body.email,
        phone: req.body.phone,
      },
      source: "CREDIT_CARD",
    })
      .then((result) => {
        res.json({
          donationId: result.donationRecordId,
          donatorId: result.donatorRecordId,
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });

    next();
  }
);

router.post(
  "/charge-boleto",
  validate({
    body: {
      allOf: [BoletoDonation.jsonSchema, donators.jsonSchema],
    },
  }),
  async (req, res, next) => {
    await ChargeBoletoOrganizer.run({
      chargeInfo: {
        donatedValue: req.body.donatedValue,
        name: req.body.name,
        email: req.body.email,
        cpf: req.body.cpf,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        postalCode: req.body.postalCode,
        street: req.body.street,
        number: req.body.number,
        neighborhood: req.body.neighborhood,
      },
      donatorInfo: {
        name: req.body.name,
        birthDate: req.body.birthDate,
        motivation: req.body.motivation,
        occupation: req.body.occupation,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        email: req.body.email,
        phone: req.body.phone,
      },
      source: "BOLETO",
    })
      .then((result) => {
        res.json({
          donationId: result.donationRecordId,
          donatorRecordId: result.donatorRecordId,
          pdfLink: result.boletoPdf,
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });

    next();
  }
);

router.get("/", verifyJWT, async (req, res) => {
  const query = {};
  let sort = {};

  if (req.query.paid) {
    query.status =
      req.query.paid === "true" ? { $eq: "PAID" } : { $ne: "PAID" };
  }

  if (req.query.source) {
    query.source = req.query.source;
  }

  if (req.query.minValue) {
    query.amount = { $gte: parseFloat(req.query.minValue) };
  }

  if (req.query.maxValue) {
    if (query.amount) {
      query.amount.$lte = parseFloat(req.query.maxValue);
    } else {
      query.amount = { $lte: parseFloat(req.query.maxValue) };
    }
  }

  if (req.query.sortBy) {
    sort = { [req.query.sortBy]: 1 };
  }

  await Donation.Model.find(query)
    .sort(sort)
    .exec((err, docs) => {
      if (err) return res.status(500).json(err);

      return res.json({
        donations: docs,
        total: docs
          ? docs.map((doc) => doc.amount).reduce((total, doc) => total + doc)
          : 0,
      });
    });
});

module.exports = router;
