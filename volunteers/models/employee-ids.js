const employeeIdsSchema = {
  type: "object",
  required: ["employeeIds"],
  properties: {
    employeeIds: {
      type: "array",
      items: {
        type: "number",
      },
    },
  },
};

module.exports = {
  jsonSchema: employeeIdsSchema,
};
