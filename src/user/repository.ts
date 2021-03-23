import { User as UserModelCtor } from "../models/sequelize";
import { User, UserDTO } from "./user";

export class UsersRepository {
  static async findAllUsers(limit = 5): Promise<UserDTO[]> {
    const users = await UserModelCtor.findAll({
      limit,
    });

    if (!users) throw new Error("Error fetching all users");

    const usersDTO: UserDTO[] = users.map((user) => {
      const userDTO: UserDTO = {
        firstName: user.getDataValue("firstName"),
        lastName: user.getDataValue("lastName"),
        email: user.getDataValue("email"),
        password: user.getDataValue("password"),
      };
      return userDTO;
    });

    return usersDTO;
  }

  static async findUserById(userID: string): Promise<UserDTO> {
    const user = await UserModelCtor.findByPk(userID);
    if (!user) throw new Error("Error fetching user by id");

    const userDTO: UserDTO = {
      firstName: user.getDataValue("firstName"),
      lastName: user.getDataValue("lastName"),
      email: user.getDataValue("email"),
      password: user.getDataValue("password"),
    };

    return userDTO;
  }

  static async createUser(user: User): Promise<UserDTO> {
    const userDTO = user.toDTO();
    const newUser = await UserModelCtor.create(userDTO);

    if (!newUser) throw new Error("Error creating user");

    return userDTO;
  }
}
