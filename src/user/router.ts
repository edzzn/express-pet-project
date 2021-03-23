import express from "express";
import {
  getUserByID,
  getUserListController,
  getUserSignUp,
} from "./controller";

export const userRouter = express.Router();

userRouter.get("/", getUserListController);

userRouter.get("/signup", getUserSignUp);

userRouter.get("/:id", getUserByID);
