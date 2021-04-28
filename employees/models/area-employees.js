const database = require("../config/db-connection");

const jsonSchema = {
  type: "object",
  id: "areaEmployee",
  properties: {
    areaId: {
      type: "Number",
    },
    employeeId: {
      type: "Number",
    },
  },
  additionalProperties: false,
};

const AreaEmployee = database.define("areaEmployee", {});

module.exports = {
  Model: AreaEmployee,
  jsonSchema,
};
