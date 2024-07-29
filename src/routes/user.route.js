import { Router } from "express";
const router = Router();
import UserController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { signUpSchema, loginSchema } from "../schema/user.schema.js";


router.post("/signup", validate(signUpSchema), UserController.signUp );
router.post("/login", validate(loginSchema), UserController.login );
router.post("/logout", UserController.logout );

export default router;