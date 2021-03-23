import express from "express";
import {
  getUserByID,
  getUserListController,
  getUserSignUp,
  postUserSignUp,
} from "./controller";

export const userRouter = express.Router();

userRouter.get("/", getUserListController);

userRouter.get("/signup", getUserSignUp);
userRouter.post("/signup", postUserSignUp);

userRouter.get("/:id", getUserByID);
