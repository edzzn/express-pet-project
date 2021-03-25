import { Request, Response } from "express";
import url from "url";
import { WarningMessage } from "../core/types";
import { UsersRepository } from "./repository";
import { User } from "./user";

export async function getUserListController(req: Request, res: Response) {
  const usersDTO = await UsersRepository.findAllUsers(10);

  const users = usersDTO.map((user) => User.fromDTO(user));

  const messages = await req.consumeFlash("info");
  const warnings = await req.consumeFlash("warning");
  res.render("user/list_users", {
    title: `User List`,
    users: users,
    messages,
    warnings,
  });
}

export async function getUserByID(req: Request, res: Response) {
  const userId = req.params.id;
  const userDTO = await UsersRepository.findUserById(userId);

  const user = User.fromDTO(userDTO);

  const messages = await req.consumeFlash("info");
  const warnings = await req.consumeFlash("warning");
  res.render("user/profile", {
    title: `User: ${userId}`,
    user: user,
    messages,
    warnings,
  });
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
    const user: User = await User.build({
      email,
      password,
      firstName,
      lastName,
    });

    await UsersRepository.createUser(user);
    res.redirect("/users");
  } else {
    const warningMessage = "There was an error signing up, please try again";

    res.redirect(
      // TODO: replace deprecated
      url.format({
        pathname: "/users/signup/",
        query: {
          error: warningMessage,
        },
      })
    );
  }
}

export function getUserAdd(req: Request, res: Response) {
  res.render("user/add", { title: `Add user` });
}

export async function postUserAdd(req: Request, res: Response) {
  const userWithChanges = await User.build({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  await UsersRepository.createUser(userWithChanges);

  await req.flash("info", "User created!");
  res.redirect("/users");
}

export async function getUserEditByID(req: Request, res: Response) {
  const userId = req.params.id;
  const userDTO = await UsersRepository.findUserById(userId);

  const user = User.fromDTO(userDTO);

  const messages = await req.consumeFlash("info");
  const warnings = await req.consumeFlash("warning");
  res.render("user/edit", {
    title: `Edit user: ${userId}`,
    user: user,
    messages,
    warnings,
  });
}

export async function postUserEditByID(req: Request, res: Response) {
  const userWithChanges = new User(
    {
      id: req.params.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    },
    true
  );

  const userDTO = await UsersRepository.updateUser(userWithChanges);

  const updatedUser = User.fromDTO(userDTO);

  await req.flash("info", "User edited!");
  res.redirect(`/users/${updatedUser.id}/edit`);
}

export async function getDeleteUserByID(req: Request, res: Response) {
  const userId = req.params.id;
  await UsersRepository.deleteUseById(userId);

  await req.flash("warning", "User deleted!");
  res.redirect("/users");
}
