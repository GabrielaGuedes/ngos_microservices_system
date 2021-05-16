const mongoose = require("mongoose-schema-jsonschema")();
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const configSchema = new Schema(
  {
    allowExport: {
      type: Boolean,
      required: false,
    },
    allowCharts: {
      type: Boolean,
      required: false,
    },
    current: {
      type: Boolean,
      default: true,
      index: {
        unique: true,
        dropDups: true,
      },
      required: false,
    },
  },
  { timestamps: true }
);

configSchema.plugin(uniqueValidator);

module.exports = {
  jsonSchema: configSchema.jsonSchema(),
  Model: mongoose.model("configs", configSchema),
};
