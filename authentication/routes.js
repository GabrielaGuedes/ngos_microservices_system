const express = require("express");
const jwt = require("jsonwebtoken");
const donators = require("./controllers/donators");
const donations = require("./controllers/donations");

const router = express.Router();

router.use("/login", (req, res) => {
  //esse teste abaixo deve ser feito no seu banco de dados
  console.log(req.body);
  if (req.body.user === "tuk" && req.body.password === "123") {
    //auth ok
    const id = 1; //esse id viria do banco de dados
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300, // expires in 5min
    });
    return res.json({ auth: true, token });
  }

  return res.status(500).json({ message: "Login inválido!" });
});
router.use("/logout", (req, res) => {
  res.json({ auth: false, token: null });
});

router.use("/api/donators", donators);
router.use("/api/donations", donations);

module.exports = router;
