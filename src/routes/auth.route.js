import { Router } from "express";
const router = Router();
import AuthController from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { signUpSchema, loginSchema } from "../schema/user.schema.js";
import { USER_TYPES } from "../utils/user.js";


//create super admin route
router.post("/create-super-admin", validate(signUpSchema), AuthController.createSuperAdmin );

//create admin route
router.post(
  "/create-admin",
  authenticate([USER_TYPES.SUPERADMIN, USER_TYPES.ADMIN]),
  validate(signUpSchema),
  AuthController.createAdmin
);

//add doctors route
router.post(
  "/create-doctors",
  authenticate(USER_TYPES.ADMIN),
  validate(signUpSchema),
  AuthController.addDoctors
);

//create patients route
router.post("/signup", validate(signUpSchema), AuthController.signUp );

//login route for all users
router.post("/login", validate(loginSchema), AuthController.login );

//logout route for all users
router.post("/logout", AuthController.logout );

export default router;