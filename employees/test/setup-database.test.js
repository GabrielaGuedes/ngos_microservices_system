/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const database = require("../config/db-connection");

before(async () => {
  await database.sync({ force: true });
});
