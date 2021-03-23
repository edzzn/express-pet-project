import { User } from "../models/sequelize";
import { UserDTO } from "./user";

export class UsersRepository {
  static async findAllUsers(limit = 5): Promise<UserDTO[]> {
    const users = await User.findAll({
      limit,
    });

    if (!users) throw new Error("Error fetching all users");

    const usersDTO: UserDTO[] = users.map((user) => {
      const userDTO: UserDTO = { name: JSON.stringify(user) };
      return userDTO;
    });

    return usersDTO;
  }

  static async findUserById(userID: string): Promise<UserDTO> {
    const user = await User.findByPk(userID);

    if (!user) throw new Error("Error fetching user by id");

    const userDTO: UserDTO = { name: JSON.stringify(user) };

    return userDTO;
  }
}
