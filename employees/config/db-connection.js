const Sequelize = require("sequelize");
require("dotenv/config");

const env = process.env.NODE_ENV || "development";
if (env === "test") {
  process.env.DB_URI = process.env.TEST_DB_CONNECTION;
} else {
  process.env.DB_URI = process.env.DB_CONNECTION;
}

const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
