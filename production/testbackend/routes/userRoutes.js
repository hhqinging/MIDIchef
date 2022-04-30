import express from "express";
import { userSignInCtrl, userSignUpCtrl } from "../controllers/userCtrl.js";

const userRouter = express.Router();


userRouter.post("/register",userSignUpCtrl)
userRouter.post("/login",userSignInCtrl)

export default userRouter;