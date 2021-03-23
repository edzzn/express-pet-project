import { Request, Response } from "express";
import url from "url";
import { WarningMessage } from "../core/types";
import { UsersRepository } from "./repository";
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
  const warningMessage: WarningMessage = {
    message: req.query?.error?.toString() || "",
  };
  res.render("user/sign_up", { warningMessage });
}

export async function postUserSignUp(req: Request, res: Response) {
  const email = req.body?.email;
  const password = req.body?.password;
  const firstName = req.body?.firstName;
  const lastName = req.body?.lastName;

  if (email && password && firstName && lastName) {
    const user: User = new User({ email, password, firstName, lastName });

    await UsersRepository.createUser(user);
    res.redirect("/user");
  } else {
    const warningMessage = "There was an error signing up, please try again";

    res.redirect(
      // TODO: replace deprecated
      url.format({
        pathname: "/user/signup/",
        query: {
          error: warningMessage,
        },
      })
    );
  }
}
