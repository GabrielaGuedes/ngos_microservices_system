const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const cors = require("cors");
const validation = require("./middleware/validate-errors");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(validation);
app.use("/", routes);

mongoose
  .connect("mongodb://db:27017/crud-node-mongo-docker", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB Conectado");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(9000, () => console.log("Server ativo na porta 9000"));
