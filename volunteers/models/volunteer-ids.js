const volunteerIdsSchema = {
  type: "object",
  required: ["volunteerIds"],
  properties: {
    volunteerIds: {
      type: "array",
      items: {
        type: "number",
      },
    },
  },
};

module.exports = {
  jsonSchema: volunteerIdsSchema,
};
