const database = require("../config/db-connection");

const jsonSchema = {
  type: "object",
  id: "teamEmployee",
  properties: {
    teamId: {
      type: "Number",
    },
    employeeId: {
      type: "Number",
    },
  },
  additionalProperties: false,
};

const TeamEmployee = database.define("teamEmployee", {});

module.exports = {
  Model: TeamEmployee,
  jsonSchema,
};
