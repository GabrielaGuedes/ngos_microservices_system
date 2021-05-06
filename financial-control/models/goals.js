const Sequelizer = require("sequelizer");
const database = require("../config/db-connection");

const jsonSchema = {
  type: "object",
  id: "goal",
  required: ["goalValue", "currentValue", "deadline"],
  properties: {
    goalValue: {
      type: "number",
    },
    currentValue: {
      type: "number",
    },
    deadline: {
      type: "string",
      format: "date",
    },
    reached: {
      type: "boolean",
    },
    description: {
      type: "string",
    },
  },
};

const Goal = database.define(
  "goal",
  Sequelizer.fromJsonSchema([jsonSchema], "goal", {})
);

module.exports = {
  Model: Goal,
  jsonSchema,
};
