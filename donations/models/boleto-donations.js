const boletoDonationSchema = {
  type: "object",
  required: [
    "donatedValue",
    "name",
    "email",
    "cpf",
    "country",
    "state",
    "city",
    "postalCode",
    "street",
    "number",
    "neighborhood",
  ],
  properties: {
    donatedValue: {
      type: "number",
      minimum: 5.0,
    },
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    cpf: {
      type: "integer",
    },
    country: {
      type: "string",
    },
    state: {
      type: "string",
      pattern: "[A-Z]{2}",
    },
    city: {
      type: "string",
    },
    postalCode: {
      type: "integer",
    },
    street: {
      type: "string",
    },
    number: {
      type: "integer",
    },
    neighborhood: {
      type: "string",
    },
  },
};

exports.jsonSchema = boletoDonationSchema;
