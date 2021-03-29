import Model from "sequelize/types/lib/model";
import { User as UserModelCtor, sequelize } from "../models/sequelize";
import { FindOptions } from "sequelize";

import { User, UserDTO } from "./user";
import { ValueOrFailure } from "../core/valueObject";

export class UsersRepository {
  static async findAllUsers(): Promise<UserDTO[]> {
    const users = await UserModelCtor.findAll({});

    if (!users) throw new Error("Error fetching all users");

    const usersDTO: UserDTO[] = users.map(userModelToUserDTO);
    return usersDTO;
  }

  static async findUserById(userID: string): Promise<UserDTO> {
    const user = await UserModelCtor.findByPk(userID);
    if (!user) throw new Error("Error fetching user by id");

    return userModelToUserDTO(user);
  }

  static async findUserByEmail(
    email: string
  ): Promise<ValueOrFailure<UserDTO>> {
    const user = await UserModelCtor.findOne({ where: { email: email } });
    if (!user) return { ok: false, message: "Can't find user by email" };

    return { ok: true, value: userModelToUserDTO(user) };
  }

  static async createUser(user: User): Promise<UserDTO> {
    const t = await sequelize.transaction();

    try {
      const userDTO = user.toDTO();
      const newUser = await UserModelCtor.create(userDTO, { transaction: t });
      // Other action can be added using the same transaction parameter
      // const newUser = await UserModelCtor.create(userDTO, { transaction: t });
      await t.commit();
      return userModelToUserDTO(newUser);
    } catch (error) {
      await t.rollback();
      throw new Error("Error creating user");
    }
  }

  static async updateUser(userWithChanges: User): Promise<UserDTO> {
    const user = await UserModelCtor.findByPk(userWithChanges.id);
    if (!user) throw new Error("Error updating user by id, user not found");
    const updatedUser = await user.update(userWithChanges.toDTO());
    if (!updatedUser) throw new Error("Error updating user, unexpected");

    return userModelToUserDTO(updatedUser);
  }

  static async deleteUseById(userID: string): Promise<void> {
    await UserModelCtor.destroy({ where: { id: userID } });
    return;
  }
}

function userModelToUserDTO(user: Model<any, any>): UserDTO {
  const userDTO: UserDTO = {
    id: user.getDataValue("id"),
    firstName: user.getDataValue("firstName"),
    lastName: user.getDataValue("lastName"),
    email: user.getDataValue("email"),
    password: user.getDataValue("password"),
    createdAt: user.getDataValue("createdAt"),
    updatedAt: user.getDataValue("updatedAt"),
  };

  return userDTO;
}
