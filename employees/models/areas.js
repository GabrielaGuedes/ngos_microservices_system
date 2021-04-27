const Sequelizer = require("sequelizer");
const database = require("../config/db-connection");

const jsonSchema = {
  type: "object",
  id: "area",
  required: ["name"],
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  additionalProperties: false,
};

const Area = database.define(
  "Area",
  Sequelizer.fromJsonSchema([jsonSchema], "area", {
    uniqueFields: ["name"],
  })
);

module.exports = {
  Model: Area,
  jsonSchema,
};
