import express from "express";
import passport from "passport";
import { getSignUp, getSignIn, postSignUp } from "./controller";

export const authRouter = express.Router();

authRouter.get("/signup", getSignUp);
authRouter.post("/signup", postSignUp);

authRouter.get("/signin", getSignIn);
authRouter.post(
  "/signin",
  passport.authenticate("local", { failureRedirect: "/signin" }),
  function (req, res) {
    req.flash("success", "Logged in.");
    res.redirect("/users");
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged out.");
  res.redirect("/");
});
