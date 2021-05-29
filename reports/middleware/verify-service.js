const { hasFinancialControlService } = require("../utils/service-checker");

exports.verifyService = async (_req, res, next) => {
  await hasFinancialControlService()
    .then((serviceEnabled) => {
      if (serviceEnabled) {
        return next();
      }
      return res.status(503).json({ message: "Service unavailable" });
    })
    .catch((err) => res.status(500).json(err));
};
