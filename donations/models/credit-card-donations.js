const creditCardDonationSchema = {
  type: "object",
  required: [
    "creditCardNumber",
    "cvv",
    "donatedValue",
    "expireMonth",
    "expireYear",
    "name",
  ],
  properties: {
    creditCardNumber: {
      type: "integer",
    },
    cvv: {
      type: "integer",
      minLength: 1,
    },
    donatedValue: {
      type: "number",
      minimum: 1.0,
    },
    expireMonth: {
      type: "string",
      pattern: "[0-9]{2}",
    },
    expireYear: {
      type: "string",
      pattern: "[0-9]{4}",
    },
    name: {
      type: "string",
    },
  },
};

module.exports = {
  jsonSchema: creditCardDonationSchema,
};
