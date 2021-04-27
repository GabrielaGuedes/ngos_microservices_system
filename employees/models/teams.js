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
  additionalProperties: false,
};

const Team = database.define(
  "Team",
  Sequelizer.fromJsonSchema([jsonSchema], "team", {
    uniqueFields: ["name"],
  })
);

module.exports = {
  Model: Team,
  jsonSchema,
};
