import { UsersRepository } from "./repository";
import { Request, Response } from "express";
import { User } from "./user";

export async function getUserListController(req: Request, res: Response) {
  const usersDTO = await UsersRepository.findAllUsers();

  const users = usersDTO.map((user) => User.fromDTO(user));

  res.render("user/list_users", { title: `User List`, users: users });
}

export async function getUserByID(req: Request, res: Response) {
  const userId = req.params.id;
  const userDTO = await UsersRepository.findUserById(userId);

  const user = User.fromDTO(userDTO);

  res.render("user/profile", { title: `User: ${userId}`, user: user });
}

export function getUserSignUp(req: Request, res: Response) {
  res.render("user/sign_up");
}
