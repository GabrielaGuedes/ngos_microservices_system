require("dotenv/config");

const env = process.env.NODE_ENV || "development";
if (env === "test") {
  process.env.DATABASE_NAME = process.env.TEST_DATABASE;
} else {
  process.env.DATABASE_NAME = process.env.DATABASE;
}

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DB_HOST,
  dialect: "postgres",
};
