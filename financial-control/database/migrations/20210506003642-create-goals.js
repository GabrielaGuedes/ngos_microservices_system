module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable("goals", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      goalValue: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      currentValue: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      deadline: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      reached: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable("goals"),
};
