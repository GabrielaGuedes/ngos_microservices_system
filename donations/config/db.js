const mongoose = require("mongoose");
require("dotenv/config");

const env = process.env.NODE_ENV || "development";
if (env === "test") {
  process.env.MONGODB_URI = process.env.TEST_DB_CONNECTION;
} else {
  process.env.MONGODB_URI = process.env.DB_CONNECTION;
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectInterval: 5000,
    reconnectTries: 50,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(`Error on database connectiom: ${err}`));
mongoose.Promise = global.Promise;

module.exports = mongoose;
