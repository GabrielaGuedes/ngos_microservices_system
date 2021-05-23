const mongoose = require("mongoose-schema-jsonschema")();
const uniqueValidator = require("mongoose-unique-validator");

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
      default: "ONG",
    },
    mainColor: {
      type: String,
      required: false,
      default: "#00b2b5",
    },
    backgroundColor: {
      type: String,
      required: false,
      default: "#f0ffff",
    },
    fontsColor: {
      type: String,
      required: false,
      default: "#000000",
    },
  },
  { timestamps: true }
);

detailSchema.plugin(uniqueValidator);

module.exports = {
  jsonSchema: detailSchema.jsonSchema(),
  Model: mongoose.model("details", detailSchema),
};
