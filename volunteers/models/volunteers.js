const Sequelizer = require("sequelizer");
const database = require("../config/db-connection");
const areas = require("./areas");
const teams = require("./teams");

const jsonSchema = {
  type: "object",
  id: "volunteer",
  required: [
    "name",
    "address",
    "city",
    "state",
    "country",
    "occupation",
    "birthDate",
    "hireDate",
    "phone",
    "email",
  ],
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
    occupation: {
      type: "string",
    },
    birthDate: {
      type: "string",
      format: "date",
    },
    hireDate: {
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

Volunteers.belongsToMany(areas.Model, { through: "areaVolunteerss" });
areas.Model.belongsToMany(Volunteers, { through: "areaVolunteerss" });

Volunteers.belongsToMany(teams.Model, { through: "teamVolunteerss" });
teams.Model.belongsToMany(Volunteers, { through: "teamVolunteerss" });

module.exports = {
  Model: Volunteers,
  jsonSchema,
};
