const Sequelize = require("sequelize");
require("dotenv/config");

const sequelize = new Sequelize(process.env.DB_CONNECTION, {
  dialect: "postgres",
});

(async () => {
  try {
    await sequelize.sync();
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
})();

module.exports = sequelize;
