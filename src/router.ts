import express from "express";
import { userRouter } from "./user/router";

export const mainRouter = express.Router();

mainRouter.use("/users", userRouter);
