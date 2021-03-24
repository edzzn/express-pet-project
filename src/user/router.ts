import express from "express";
import {
  getDeleteUserByID,
  getUserAdd,
  getUserByID,
  getUserEditByID,
  getUserListController,
  getUserSignUp,
  postUserAdd,
  postUserEditByID,
  postUserSignUp,
} from "./controller";

export const userRouter = express.Router();

userRouter.get("/", getUserListController);

userRouter.get("/signup", getUserSignUp);
userRouter.post("/signup", postUserSignUp);

userRouter.get("/add", getUserAdd);
userRouter.post("/add", postUserAdd);

userRouter.get("/:id", getUserByID);

userRouter.get("/:id/edit", getUserEditByID);
userRouter.post("/:id/edit", postUserEditByID);

userRouter.get("/:id/delete", getDeleteUserByID);
