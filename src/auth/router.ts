import express from "express";
import { getSignUp, getSignIn } from "./controller";

export const authRouter = express.Router();

authRouter.get("/signup", getSignUp);
// authRouter.post("/signup", postSignUp);

authRouter.get("/signin", getSignIn);
// authRouter.post("/signin", postSignIn);
