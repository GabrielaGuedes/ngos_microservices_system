const mongoose = require("mongoose-schema-jsonschema")();
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const donatorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthDate: {
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
    index: {
      unique: true,
      dropDups: true,
    },
  },
  phone: {
    type: Number,
    required: false,
  },
  donatedValue: {
    type: Number,
    required: false,
  },
  lastDonation: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

donatorSchema.plugin(uniqueValidator);

module.exports = {
  jsonSchema: donatorSchema.jsonSchema(),
  Model: mongoose.model("donators", donatorSchema),
};
