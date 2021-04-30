module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable("areaVolunteers", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      areaId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "areas",
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

  down: async (queryInterface) => queryInterface.dropTable("areaVolunteers"),
};
