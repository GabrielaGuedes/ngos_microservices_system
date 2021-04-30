const Sequelizer = require("sequelizer");
const database = require("../config/db-connection");
const areas = require("./areas");
const teams = require("./teams");

const jsonSchema = {
  type: "object",
  id: "volunteer",
  required: ["name", "city", "state", "country", "birthDate", "phone", "email"],
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
    birthDate: {
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

const Volunteers = database.define(
  "volunteer",
  Sequelizer.fromJsonSchema([jsonSchema], "volunteer", {
    uniqueFields: ["email"],
  })
);

Volunteers.belongsToMany(areas.Model, { through: "areaVolunteers" });
areas.Model.belongsToMany(Volunteers, { through: "areaVolunteers" });

Volunteers.belongsToMany(teams.Model, { through: "teamVolunteers" });
teams.Model.belongsToMany(Volunteers, { through: "teamVolunteers" });

module.exports = {
  Model: Volunteers,
  jsonSchema,
};
