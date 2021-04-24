const mongoose = require("mongoose-schema-jsonschema")();
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const donationSchema = new Schema(
  {
    donationId: {
      type: String,
      require: true,
      index: {
        unique: true,
        dropDups: true,
      },
    },
    status: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    donatorEmail: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

donationSchema.plugin(uniqueValidator);

exports.jsonSchema = donationSchema.jsonSchema();

exports.Model = mongoose.model("donations", donationSchema);
