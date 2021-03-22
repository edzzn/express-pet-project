import express from "express";
export const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.render("user/list_users", {
    title: "users",
    debugMessage: "I can now send params",
  });
});

userRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.render("user/profile", { title: `User: ${userId}`, user: userId });
});
