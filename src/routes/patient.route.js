import { Router } from "express";
const router = Router();
import PatientController from "../controllers/patient.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { signUpSchema, loginSchema } from "../schema/patient.schema.js";


router.post("/signup", validate(signUpSchema), PatientController.signUp );
router.post("/login", validate(loginSchema), PatientController.login );
router.post("/logout", PatientController.logout );

export default router;