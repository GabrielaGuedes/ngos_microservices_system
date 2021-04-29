const express = require("express");
require("express-async-errors");
const cors = require("cors");
const validation = require("./middleware/validate-errors");
const routes = require("./routes");
require("dotenv/config");
require("./config/db-connection");

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Node NOT Exiting...");
});
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", routes);
app.use(validation);

const env = process.env.NODE_ENV || "development";
if (env === "test") {
  process.env.PORT = process.env.TEST_PORT;
}
app.listen(process.env.PORT);
