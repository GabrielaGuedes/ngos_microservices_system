const areaIdsSchema = {
  type: "object",
  required: ["areaIds"],
  properties: {
    areaIds: {
      type: "array",
      items: {
        type: "number",
      },
    },
  },
};

module.exports = {
  jsonSchema: areaIdsSchema,
};
