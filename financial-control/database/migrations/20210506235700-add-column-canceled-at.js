module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn("transactions", "canceledAt", {
      type: Sequelize.DATEONLY,
      allowNull: true,
    }),

  down: async (queryInterface) =>
    queryInterface.removeColumn("transactions", "canceledAt"),
};
