import Model from "sequelize/types/lib/model";
import { User as UserModelCtor } from "../models/sequelize";
import { User, UserDTO } from "./user";

export class UsersRepository {
  static async findAllUsers(limit = 5): Promise<UserDTO[]> {
    const users = await UserModelCtor.findAll({
      limit,
    });

    if (!users) throw new Error("Error fetching all users");

    const usersDTO: UserDTO[] = users.map(userModelToUserDTO);
    return usersDTO;
  }

  static async findUserById(userID: string): Promise<UserDTO> {
    const user = await UserModelCtor.findByPk(userID);
    if (!user) throw new Error("Error fetching user by id");

    return userModelToUserDTO(user);
  }

  static async createUser(user: User): Promise<UserDTO> {
    // TODO: Add a transaction
    const userDTO = user.toDTO();
    const newUser = await UserModelCtor.create(userDTO);
    if (!newUser) throw new Error("Error creating user");

    return userDTO;
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
