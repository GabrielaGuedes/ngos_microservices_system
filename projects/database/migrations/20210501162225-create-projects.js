module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable("projects", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      incomeDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      costDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      expectedIncome: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      expectedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      target: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("FINISHED", "CANCELED", "PENDING"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      responsibleArea: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      responsibleTeam: {
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

  down: async (queryInterface) => queryInterface.dropTable("projects"),
};
