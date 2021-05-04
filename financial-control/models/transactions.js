const Sequelizer = require("sequelizer");
const database = require("../config/db-connection");

const jsonSchema = {
  type: "object",
  id: "transaction",
  required: ["date", "value", "origin", "kind", "recurrent"],
  properties: {
    date: {
      type: "string",
      format: "date",
    },
    value: {
      type: "number",
    },
    origin: {
      type: "string",
    },
    kind: {
      type: "string",
      enum: ["IN", "OUT"],
    },
    recurrent: {
      type: "boolean",
    },
    description: {
      type: "string",
    },
  },
};

const Transaction = database.define(
  "transaction",
  Sequelizer.fromJsonSchema([jsonSchema], "transaction", {})
);

module.exports = {
  Model: Transaction,
  jsonSchema,
};
