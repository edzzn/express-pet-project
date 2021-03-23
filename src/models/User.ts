import { DataTypes, Sequelize } from "sequelize";

export const UserModel = (sequelize: Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return User;
};
