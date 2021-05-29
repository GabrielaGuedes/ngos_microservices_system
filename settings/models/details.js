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
    mainColor: {
      type: String,
      required: false,
      default: detailsDefault.mainColor,
    },
    backgroundColor: {
      type: String,
      required: false,
      default: detailsDefault.backgroundColor,
    },
    fontsColor: {
      type: String,
      required: false,
      default: detailsDefault.fontsColor,
    },
  },
  { timestamps: true }
);

detailSchema.plugin(uniqueValidator);

module.exports = {
  jsonSchema: detailSchema.jsonSchema(),
  Model: mongoose.model("details", detailSchema),
};
