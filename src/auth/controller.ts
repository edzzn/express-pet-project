import { Request, Response } from "express";
import url from "url";
import { WarningMessage } from "../core/types";
import { UsersRepository } from "../user/repository";
import { User } from "../user/user";

export function getSignUp(req: Request, res: Response) {
  const warningMessage: WarningMessage = {
    message: req.query?.error?.toString() || "",
  };
  res.render("auth/sign_up", { warningMessage });
}

export async function postSignUp(req: Request, res: Response) {
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

export function getSignIn(req: Request, res: Response) {
  const warningMessage: WarningMessage = {
    message: req.query?.error?.toString() || "",
  };
  res.render("auth/sign_in", { warningMessage });
}
