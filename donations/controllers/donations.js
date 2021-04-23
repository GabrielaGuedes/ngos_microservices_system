const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const CreditCardDonation = require("../models/credit-card-donations");
const ChargeCreditCardOrganizer = require("../interactors/charge-credit-card-organizer");
const donators = require("../models/donators");

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

module.exports = router;
