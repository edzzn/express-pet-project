import { Request, Response } from "express";
import url from "url";
import { WarningMessage } from "../core/types";
import { ValueOrFailure } from "../core/valueObject";
import { UsersRepository } from "../user/repository";
import { User } from "../user/user";

export function getSignUp(req: Request, res: Response) {
  const warningMessage: WarningMessage = {
    message: req.query?.error?.toString() || "",
  };
  const authmessage = req.authInfo;
  res.render("auth/sign_up", { warningMessage, authmessage });
}

export async function postSignUp(req: Request, res: Response) {
  const email = req.body?.email;
  const password = req.body?.password;
  const firstName = req.body?.firstName;
  const lastName = req.body?.lastName;

  if (email && password && firstName && lastName) {
    const userValueOrFailure: ValueOrFailure<User> = await User.build({
      email,
      password,
      firstName,
      lastName,
    });

    if (userValueOrFailure.ok) {
      await UsersRepository.createUser(userValueOrFailure.value);
    } else {
      await req.flash(
        "warning",
        "There was an error signing up, please try again"
      );
      res.redirect("/users/signup/");
    }
    await req.flash("success", "User created");
    res.redirect("/users");
  } else {
    const warningMessage = "There was an error signing up, please try again";

    await req.flash("warning", warningMessage);
    res.redirect("/users/signup/");
  }
}

export function getSignIn(req: Request, res: Response) {
  const warningMessage: WarningMessage = {
    message: req.query?.error?.toString() || "",
  };
  const authmessage = req.authInfo;
  res.render("auth/sign_in", { warningMessage, authmessage });
}
