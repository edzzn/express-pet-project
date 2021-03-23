import express from "express";
export const userRouter = express.Router();
import { User } from "../models/sequelize";

userRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    limit: 6,
  });
  res.render("user/list_users", { title: `User List`, users: users });
});

userRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.render("user/profile", { title: `User: ${userId}`, user: userId });
});
