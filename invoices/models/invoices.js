const mongoose = require("mongoose-schema-jsonschema")();
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const invoiceSchema = new Schema(
  {
    donationDate: {
      type: Date,
      required: true,
    },
    donatorName: {
      type: String,
      required: true,
    },
    donatorEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

invoiceSchema.plugin(uniqueValidator);

module.exports = {
  jsonSchema: invoiceSchema.jsonSchema(),
  Model: mongoose.model("invoices", invoiceSchema),
};
