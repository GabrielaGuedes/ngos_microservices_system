const { authorizedRequest } = require("./requests");

exports.hasFinancialControlService = async () =>
  authorizedRequest(process.env.SERVICES_SETTINGS_URL, "GET")
    .then((result) => {
      if (result.status === 200) {
        return result.json();
      }
      return Promise.reject();
    })
    .then((result) => result.financialControl);
