import express from "express";
import { getUserByID, getUserListController } from "./controller";

export const userRouter = express.Router();

userRouter.get("/", getUserListController);

userRouter.get("/:id", getUserByID);
