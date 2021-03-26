import { DataTypes, Sequelize } from "sequelize";

export const ClientModel = (sequelize: Sequelize) => {
  const Client = sequelize.define("client", {
    id: {
      type: DataTypes.INTEGER,
    },
  });

  return Client;
};
