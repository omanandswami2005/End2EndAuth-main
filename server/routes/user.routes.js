import express from "express";
import { forgotPassword, loginUser, logoutUser, registerUser, resendVerifyCode, resetPassword, verifyCode } from "../controllers/user.controllers.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/verify", verifyCode);

userRouter.post("/resend-code", resendVerifyCode);

userRouter.post("/forgot-password", forgotPassword);

userRouter.post("/reset-password/:token", resetPassword);

userRouter.post("/logout", logoutUser);

export { userRouter }