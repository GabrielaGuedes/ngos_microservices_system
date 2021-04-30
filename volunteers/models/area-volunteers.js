const database = require("../config/db-connection");

const jsonSchema = {
  type: "object",
  id: "areaVolunteer",
  properties: {
    areaId: {
      type: "Number",
    },
    volunteerId: {
      type: "Number",
    },
  },
  additionalProperties: false,
};

const AreaVolunteer = database.define("areaVolunteer", {});

module.exports = {
  Model: AreaVolunteer,
  jsonSchema,
};
