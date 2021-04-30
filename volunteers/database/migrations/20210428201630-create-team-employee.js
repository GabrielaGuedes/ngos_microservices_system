module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable("teamVolunteers", {
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
      volunteerId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "volunteers",
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

  down: async (queryInterface) => queryInterface.dropTable("teamVolunteers"),
};
