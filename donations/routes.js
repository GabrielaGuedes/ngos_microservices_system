const express = require("express");
const donators = require("./controllers/donators");

const router = express.Router();

router.use("/api/donators", donators);

module.exports = router;
