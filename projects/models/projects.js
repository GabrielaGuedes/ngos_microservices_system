const Sequelizer = require("sequelizer");
const database = require("../config/db-connection");

const jsonSchema = {
  type: "object",
  id: "project",
  required: ["name", "startDate"],
  properties: {
    name: {
      type: "string",
    },
    startDate: {
      type: "string",
      format: "date",
    },
    endDate: {
      type: "string",
      format: "date",
    },
    incomeDate: {
      type: "string",
      format: "date",
    },
    costDate: {
      type: "string",
      format: "date",
    },
    expectedIncome: {
      type: "number",
    },
    expectedCost: {
      type: "number",
    },
    description: {
      type: "string",
    },
    target: {
      type: "string",
    },
    status: {
      type: "string",
      enum: ["FINISHED", "CANCELED", "PENDING"],
    },
    responsibleArea: {
      type: "string",
    },
    responsibleTeam: {
      type: "string",
    },
  },
};

const Project = database.define(
  "project",
  Sequelizer.fromJsonSchema([jsonSchema], "project", {})
);

module.exports = {
  Model: Project,
  jsonSchema,
};
