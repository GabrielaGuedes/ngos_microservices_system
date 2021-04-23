const express = require("express");
const donators = require("./controllers/donators");
const donations = require("./controllers/donations");

const router = express.Router();

router.use("/api/donators", donators);
router.use("/api/donations", donations);

module.exports = router;
