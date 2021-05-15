const express = require("express");
require("express-async-errors");
const cors = require("cors");
const validation = require("./middleware/validate-errors");
const routes = require("./routes");
const verifyJWT = require("./middleware/verify-jwt");
require("dotenv/config");
require("./config/db-connection");

const env = process.env.NODE_ENV || "development";

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Node NOT Exiting...");
});
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", routes);
app.use(validation);
app.use("/files", verifyJWT);
app.use(
  "/files",
  express.static(
    env === "test" ? process.env.TEST_FILES_PATH : process.env.FILES_PATH
  )
);

if (env === "test") {
  process.env.PORT = process.env.TEST_PORT;
}
app.listen(process.env.PORT);
