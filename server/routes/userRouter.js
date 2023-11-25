import express from "express";
import { loginController, registerController, test } from "../controllers/userController.js";

const userRouter = express.Router()


userRouter.get('/test', test)
userRouter.post('/login', loginController)
userRouter.post('/register', registerController)

export default userRouter