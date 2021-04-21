const formatDonatedValue = require("../utils/format-donated-value");

exports.creditCardBody = (
  creditCardNumber,
  cvv,
  donatedValue,
  expireMonth,
  expireYear,
  name
) => ({
  reference_id: "donation",
  description: "Doação",
  amount: {
    value: formatDonatedValue(donatedValue),
    currency: "BRL",
  },
  payment_method: {
    type: "CREDIT_CARD",
    installments: 1,
    capture: true,
    soft_descriptor: "Doação",
    card: {
      number: creditCardNumber.toString(),
      exp_month: expireMonth,
      exp_year: expireYear,
      security_code: cvv.toString(),
      holder: {
        name,
      },
    },
  },
  notification_urls: [
    // TODO: ADD URL
    "https://yourserver.com/nas_ecommerce/277be731-3b7c-4dac-8c4e-4c3f4a1fdc46/",
  ],
});
