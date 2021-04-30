const teamIdsSchema = {
  type: "object",
  required: ["teamIds"],
  properties: {
    teamIds: {
      type: "array",
      items: {
        type: "number",
      },
    },
  },
};

module.exports = {
  jsonSchema: teamIdsSchema,
};
