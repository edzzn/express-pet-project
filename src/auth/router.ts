import express from "express";
import passport from "passport";
import { getSignUp, getSignIn } from "./controller";

export const authRouter = express.Router();

authRouter.get("/signup", getSignUp);
// authRouter.post("/signup", postSignUp);

authRouter.get("/signin", getSignIn);
authRouter.post(
  "/signin",
  passport.authenticate("local", { failureRedirect: "/signin" }),
  function (req, res) {
    res.redirect("/users");
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Sesión terminada.");
  res.redirect("/");
});
