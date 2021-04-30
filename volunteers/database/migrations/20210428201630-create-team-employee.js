module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable("teamEmployees", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      teamId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "teams",
            schema: "public",
          },
          key: "id",
        },
        allowNull: false,
      },
      employeeId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "employees",
            schema: "public",
          },
          key: "id",
        },
        allowNull: false,
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

  down: async (queryInterface) => queryInterface.dropTable("teamEmployees"),
};
