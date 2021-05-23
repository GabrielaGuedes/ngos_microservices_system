const mongoose = require("mongoose-schema-jsonschema")();
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const serviceSchema = new Schema(
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
    donations: {
      type: Boolean,
      required: false,
      default: true,
    },
    employees: {
      type: Boolean,
      required: false,
      default: true,
    },
    financialControl: {
      type: Boolean,
      required: false,
      default: true,
    },
    invoices: {
      type: Boolean,
      required: false,
      default: true,
    },
    marketing: {
      type: Boolean,
      required: false,
      default: true,
    },
    projects: {
      type: Boolean,
      required: false,
      default: true,
    },
    reports: {
      type: Boolean,
      required: false,
      default: true,
    },
    volunteers: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true }
);

serviceSchema.plugin(uniqueValidator);

module.exports = {
  jsonSchema: serviceSchema.jsonSchema(),
  Model: mongoose.model("services", serviceSchema),
};
