import { QueryInterface, Sequelize, DataTypes } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('clients', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("clients", { id: DataTypes.INTEGER });
  },

  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('clients');
     */
    await queryInterface.dropTable("clients");
  },
};
