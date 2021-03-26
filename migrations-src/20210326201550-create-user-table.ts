import { QueryInterface, Sequelize, DataTypes } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('clients', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },

  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('clients');
     */
    await queryInterface.dropTable("users");
  },
};
