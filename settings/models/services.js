const mongoose = require("mongoose-schema-jsonschema")();
const uniqueValidator = require("mongoose-unique-validator");
const { servicesDefault } = require("../utils/default-values");

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
      default: servicesDefault.donations,
    },
    employees: {
      type: Boolean,
      required: false,
      default: servicesDefault.employees,
    },
    financialControl: {
      type: Boolean,
      required: false,
      default: servicesDefault.financialControl,
    },
    invoices: {
      type: Boolean,
      required: false,
      default: servicesDefault.invoices,
    },
    marketing: {
      type: Boolean,
      required: false,
      default: servicesDefault.marketing,
    },
    projects: {
      type: Boolean,
      required: false,
      default: servicesDefault.projects,
    },
    reports: {
      type: Boolean,
      required: false,
      default: servicesDefault.reports,
    },
    volunteers: {
      type: Boolean,
      required: false,
      default: servicesDefault.volunteers,
    },
  },
  { timestamps: true }
);

serviceSchema.plugin(uniqueValidator);

module.exports = {
  jsonSchema: serviceSchema.jsonSchema(),
  Model: mongoose.model("services", serviceSchema),
};
