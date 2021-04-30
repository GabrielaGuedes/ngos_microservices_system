const database = require("../config/db-connection");

const jsonSchema = {
  type: "object",
  id: "teamVolunteer",
  properties: {
    teamId: {
      type: "Number",
    },
    volunteerId: {
      type: "Number",
    },
  },
  additionalProperties: false,
};

const TeamVolunteer = database.define("teamVolunteer", {});

module.exports = {
  Model: TeamVolunteer,
  jsonSchema,
};
