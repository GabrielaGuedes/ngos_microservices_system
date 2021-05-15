const Sequelizer = require("sequelizer");
const database = require("../config/db-connection");
const files = require("./files");

const jsonSchema = {
  type: "object",
  id: "post",
  required: ["title"],
  properties: {
    title: {
      type: "string",
    },
    text: {
      type: "string",
    },
    peopleReached: {
      type: "number",
    },
    postedAt: {
      type: "string",
      format: "date",
    },
  },
};

const Post = database.define(
  "post",
  Sequelizer.fromJsonSchema([jsonSchema], "post", {})
);

Post.hasMany(files.Model, {
  onDelete: "CASCADE",
  // hooks: true,
});
files.Model.belongsTo(Post);

module.exports = {
  Model: Post,
  jsonSchema,
};
