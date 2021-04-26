const Sequelizer = require("sequelizer");
const database = require("../config/db");

const jsonSchema = {
  type: "object",
  id: "employee",
  required: [
    "name",
    "address",
    "city",
    "state",
    "country",
    "occupation",
    "birthDate",
    "hireDate",
    "phone",
    "email",
  ],
  properties: {
    name: {
      type: "string",
    },
    address: {
      type: "string",
    },
    city: {
      type: "string",
    },
    state: {
      type: "string",
      pattern: "[A-Z]{2}",
    },
    country: {
      type: "string",
    },
    occupation: {
      type: "string",
    },
    birthDate: {
      type: "string",
      format: "date",
    },
    hireDate: {
      type: "string",
      format: "date",
    },
    phone: {
      type: "number",
    },
    email: {
      type: "string",
      format: "email",
    },
    additionalInfo: {
      type: "string",
    },
  },
};

const Employee = database.define(
  "employee",
  Sequelizer.fromJsonSchema([jsonSchema], "employee", {
    uniqueFields: ["email"],
  })
);

module.exports = {
  Model: Employee,
  jsonSchema,
};
