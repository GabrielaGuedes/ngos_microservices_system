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
});
