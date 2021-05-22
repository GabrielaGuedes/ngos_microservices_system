const Config = require("../models/configs");

const verification = async (_req, res, next, type) => {
  await Config.Model.findOne({ current: true }).exec((err, docs) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Couldn't find config for report.", err });

    if (!docs || docs[type]) {
      return next();
    }

    return res.status(403).json({ message: "Not allowed", err });
  });
};

const verifyCharts = async (req, res, next) =>
  verification(req, res, next, "allowCharts");

const verifyExport = async (req, res, next) =>
  verification(req, res, next, "allowExport");

module.exports = {
  verifyCharts,
  verifyExport,
};
