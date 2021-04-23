const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const Donator = require("../models/donators");

const router = express.Router();

const { validate } = new Validator();

router.post(
  "/create",
  validate({ body: Donator.jsonSchema }),
  async (req, res, next) => {
    const newDonator = new Donator.Model({
      name: req.body.name,
      birthDate: req.body.birthDate,
      occupation: req.body.occupation,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      email: req.body.email,
      phone: req.body.phone,
      donatedValue: req.body.donatedValue,
    });

    await newDonator
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
    next();
  }
);

router.get("/", async (req, res) => {
  await Donator.Model.find()
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
