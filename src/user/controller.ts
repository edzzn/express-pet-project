import { Request, Response } from "express";
import { UsersRepository } from "./repository";
import { User } from "./user";

export async function getUserListController(req: Request, res: Response) {
  const usersDTO = await UsersRepository.findAllUsers(10);

  const users = usersDTO.map((user) => User.fromDTO(user));

  const infos = await req.consumeFlash("info");
  const warnings = await req.consumeFlash("warning");
  const success = await req.consumeFlash("success");

  res.render("user/list_users", {
    title: `User List`,
    users: users,
    infos,
    warnings,
    success,
  });
}

export async function getUserByID(req: Request, res: Response) {
  const userId = req.params.id;
  const userDTO = await UsersRepository.findUserById(userId);

  const user = User.fromDTO(userDTO);

  const infos = await req.consumeFlash("info");
  const warnings = await req.consumeFlash("warning");
  const success = await req.consumeFlash("success");

  res.render("user/profile", {
    title: `User: ${userId}`,
    user: user,
    infos,
    warnings,
    success,
  });
}

export async function getUserAdd(req: Request, res: Response) {
  const infos = await req.consumeFlash("info");
  const warnings = await req.consumeFlash("warning");
  const success = await req.consumeFlash("warning");

  res.render("user/add", { title: `Add user`, infos, warnings, success });
}

export async function postUserAdd(req: Request, res: Response) {
  const userWithChangesValueOrFailure = await User.build({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  if (userWithChangesValueOrFailure.ok) {
    await UsersRepository.createUser(userWithChangesValueOrFailure.value);
    await req.flash("info", "User created!");
    res.redirect("/users");
  } else {
    await req.flash("warning", userWithChangesValueOrFailure.message);
    res.redirect("/users/add");
  }
}

export async function getUserEditByID(req: Request, res: Response) {
  const userId = req.params.id;
  const userDTO = await UsersRepository.findUserById(userId);

  const user = User.fromDTO(userDTO);

  const infos = await req.consumeFlash("info");
  const warnings = await req.consumeFlash("warning");
  const success = await req.consumeFlash("success");

  res.render("user/edit", {
    title: `Edit user: ${userId}`,
    user: user,
    infos,
    warnings,
    success,
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
