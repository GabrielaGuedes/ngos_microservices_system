const filePathsSchema = {
  type: "object",
  required: ["filePaths"],
  properties: {
    filePaths: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
};

module.exports = {
  jsonSchema: filePathsSchema,
};
