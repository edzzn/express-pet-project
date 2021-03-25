"use strict";

import { DataTypes, Model, Sequelize } from "sequelize/types";
import { AssociatedModel } from ".";

export const UserModel = (sequelize: Sequelize) => {
  class User extends Model implements AssociatedModel {
    associate(models: Model<any, any>[]): void {
      // define association here
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
