const express = require("express");
const volunteers = require("./controllers/volunteers");
const areas = require("./controllers/areas");
const teams = require("./controllers/teams");

const router = express.Router();

router.use("/api/volunteers", volunteers);
router.use("/api/areas", areas);
router.use("/api/teams", teams);

module.exports = router;
