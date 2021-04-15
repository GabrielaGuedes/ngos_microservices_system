const mongoose = require("mongoose-schema-jsonschema")();

const { Schema } = mongoose;

const donatorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birth_date: {
    type: Date,
    required: true,
  },
  occupation: {
    type: String,
    required: false,
  },
  motivation: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  amount_donated: {
    type: Number,
    required: false,
  },
  last_donation: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

exports.jsonSchema = donatorSchema.jsonSchema();

exports.Model = mongoose.model("donators", donatorSchema);
