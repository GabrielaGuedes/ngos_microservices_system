const Sequelizer = require("sequelizer");
const database = require("../config/db-connection");

const jsonSchema = {
  type: "object",
  id: "file",
  required: ["path", "postId"],
  properties: {
    path: {
      type: "string",
    },
    postId: {
      type: "number",
    },
  },
};

const File = database.define(
  "file",
  Sequelizer.fromJsonSchema([jsonSchema], "file", {})
);

module.exports = {
  Model: File,
  jsonSchema,
};
