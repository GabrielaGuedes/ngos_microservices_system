const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const CreditCardDonation = require("../models/credit-card-donations");
const BoletoDonation = require("../models/boleto-donations");
const ChargeCreditCardOrganizer = require("../interactors/charge-credit-card-organizer");
const donators = require("../models/donators");
const ChargeBoletoOrganizer = require("../interactors/charge-boleto-organizer");

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
          donatorRecordId: result.donatorRecordId,
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
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });

    next();
  }
);

module.exports = router;
