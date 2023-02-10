import express from "express";

import { parentLogin, teacherLogin, userLogin, userChangePassword } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/user/login", userLogin);
authRouter.post("/teacher/login", teacherLogin);
authRouter.post("/parent/login", parentLogin);
authRouter.put("/user/changePassword", userChangePassword);

export default authRouter;