module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable("posts", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "posts",
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

  down: async (queryInterface) => queryInterface.dropTable("posts"),
};
