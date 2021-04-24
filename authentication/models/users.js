const mongoose = require("mongoose-schema-jsonschema")();
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
  {
    name: {
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
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

// Encrypt password before saving
// eslint-disable-next-line func-names
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    return bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      user.password = hash;
      return next();
    });
  });
});

userSchema.methods.comparePassword = (candidatePassword, encPassword, cb) => {
  bcrypt.compare(candidatePassword, encPassword, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

module.exports = {
  rawSchema: userSchema,
  jsonSchema: userSchema.jsonSchema(),
  Model: mongoose.model("users", userSchema),
};
