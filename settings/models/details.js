const mongoose = require("mongoose-schema-jsonschema")();
const uniqueValidator = require("mongoose-unique-validator");
const { detailsDefault } = require("../utils/default-values");

const { Schema } = mongoose;

const detailSchema = new Schema(
  {
    current: {
      type: Boolean,
      default: true,
      index: {
        unique: true,
        dropDups: true,
      },
      required: false,
    },
    name: {
      type: String,
      required: false,
      default: detailsDefault.name,
    },
  },
  { timestamps: true }
);

detailSchema.plugin(uniqueValidator);

module.exports = {
  jsonSchema: detailSchema.jsonSchema(),
  Model: mongoose.model("details", detailSchema),
};
