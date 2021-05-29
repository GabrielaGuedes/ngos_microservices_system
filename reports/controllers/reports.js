const express = require("express");
const { verifyCharts, verifyExport } = require("../middleware/verify-config");
const { verifyService } = require("../middleware/verify-service");
const { createSheet } = require("../utils/create-sheet");
const { authorizedRequest } = require("../utils/requests");

const router = express.Router();

router.get("/charts", verifyCharts, verifyService, async (req, res) => {
  await authorizedRequest(
    `${process.env.FINANCIAL_SERVER_URL}/api/grouped-transactions/by-origin/?showCanceled=true`,
    "GET"
  )
    .then((result) => result.json())
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

router.get("/export", verifyExport, verifyService, async (req, res) => {
  await authorizedRequest(
    `${process.env.FINANCIAL_SERVER_URL}/api/transactions/?showCanceled=true`,
    "GET"
  )
    .then((result) => result.json())
    .then((result) => {
      const report = createSheet(result);

      res.set({
        "Content-disposition": `attachment; filename=report.xlsx`,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      return res.send(report);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
