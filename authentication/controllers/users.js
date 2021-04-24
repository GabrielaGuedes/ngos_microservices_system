/* eslint-disable no-underscore-dangle */
const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const User = require("../models/users");
const verifyJWT = require("../middleware/verify-jwt");
const token = require("../utils/login");

const router = express.Router();
const { validate } = new Validator();

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
      .then((result) => res.json({ auth: true, token: token(result._id) }))
      .catch((error) => {
        res.status(500).json(error);
      });
    next();
  }
);

router.post("/login", async (req, res) => {
  const user = await User.Model.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({ message: "Email not found" });

  return User.rawSchema.methods.comparePassword(
    req.body.password,
    user.password,
    (_err, isMatch) => {
      if (isMatch) {
        return res.json({ auth: true, token: token(user._id) });
      }
      return res.status(401).json({ message: "Invalid Login" });
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
      return res.status(401).json({ message: "Invalid Password" });
    }
  );
});

module.exports = router;
