const express = require("express");
require("express-async-errors");
const cors = require("cors");
const validation = require("./middleware/validate-errors");
const routes = require("./routes");
require("dotenv/config");

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
