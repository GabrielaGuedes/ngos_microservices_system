/* eslint-disable no-underscore-dangle */
const express = require("express");
const jwt = require("jsonwebtoken");
const { Validator } = require("express-json-validator-middleware");
const User = require("./models/users");
const verifyJWT = require("./middleware/verify-jwt");

const { validate } = new Validator();
const router = express.Router();
const EXPIRATION_TIME = 3000;

router.post(
  "/signup",
  validate({ body: User.jsonSchema }),
  async (req, res, next) => {
    const newUser = new User.Model({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser
      .save()
      .then((result) => {
        const token = jwt.sign({ result: result._id }, process.env.SECRET, {
          expiresIn: EXPIRATION_TIME,
        });
        return res.json({ auth: true, token });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
    next();
  }
);

router.post("/login", async (req, res) => {
  const user = await User.Model.findOne({ email: req.body.email });

  User.rawSchema.methods.comparePassword(
    req.body.password,
    user.password,
    (_err, isMatch) => {
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: EXPIRATION_TIME,
        });
        return res.json({ auth: true, token });
      }
      return res.status(500).json({ message: "Invalid Login" });
    }
  );
});

router.post("/reset-password", verifyJWT, async (req, res) => {
  const user = await User.Model.findOne({ _id: req.userId });

  User.rawSchema.methods.comparePassword(
    req.body.oldPassword,
    user.password,
    (_err, isMatch) => {
      if (isMatch) {
        user.password = req.body.newPassword;
        return user
          .save()
          .then(() => res.json({ message: "Success!" }))
          .catch(() => res.status(500).json({ message: "Error. Try again." }));
      }
      return res.status(400).json({ message: "Invalid Password" });
    }
  );
});

router.get("/", async (_req, res) => {
  await User.Model.find()
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
