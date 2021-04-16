const mongoose = require("mongoose");
require("dotenv/config");

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  reconnectInterval: 5000,
  reconnectTries: 50,
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
