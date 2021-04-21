const boletoDonationSchema = {
  type: "object",
  required: [
    "donatedValue",
    "name",
    "email",
    "cpf",
    "country",
    "stateCode",
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
      pattern: "/^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i",
    },
    cpf: {
      type: "integer",
    },
    country: {
      type: "string",
    },
    stateCode: {
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
