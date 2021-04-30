const Sequelizer = require("sequelizer");
const database = require("../config/db-connection");

const jsonSchema = {
  type: "object",
  id: "team",
  required: ["name"],
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
};

const Team = database.define(
  "team",
  Sequelizer.fromJsonSchema([jsonSchema], "team", {
    uniqueFields: ["name"],
  })
);

module.exports = {
  Model: Team,
  jsonSchema,
};
