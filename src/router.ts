import express from "express";
import { authRouter } from "./auth/router";
import { getIndex } from "./core/controller";
import { userRouter } from "./user/router";

export const mainRouter = express.Router();

mainRouter.get("/", getIndex);
mainRouter.use("/", authRouter);
mainRouter.use("/users", userRouter);
