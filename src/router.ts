import express from "express";
import { authRouter } from "./auth/router";
import { getIndex } from "./core/controller";
import { userRouter } from "./user/router";
import connectEnsureLogin from "connect-ensure-login";

export const mainRouter = express.Router();

mainRouter.get("/", getIndex);
mainRouter.use("/", authRouter);
mainRouter.use(
  "/users",
  connectEnsureLogin.ensureLoggedIn({ redirectTo: "/signin" }),
  userRouter
);
