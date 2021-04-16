const express = require("express");
require("express-async-errors");
const cors = require("cors");
require("./config/db");
const validation = require("./middleware/validate-errors");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(validation);
app.use("/", routes);

app.listen(9000);
