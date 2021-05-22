const express = require("express");
const { verifyCharts, verifyExport } = require("../middleware/verify-config");
const { createSheet } = require("../utils/create-sheet");
const { getAuthorizedRequest } = require("../utils/requests");

const router = express.Router();

router.get("/charts", verifyCharts, async (req, res) => {
  await getAuthorizedRequest(
    `${process.env.FINANCIAL_SERVER_URL}/api/grouped-transactions/by-origin/?showCanceled=true`
  )
    .then((result) => result.json())
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

router.get("/export", verifyExport, async (req, res) => {
  await getAuthorizedRequest(
    `${process.env.FINANCIAL_SERVER_URL}/api/transactions/?showCanceled=true`
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
