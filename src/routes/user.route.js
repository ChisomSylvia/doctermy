import { Router } from "express";
const router = Router();
import UserController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { updateUserSchema } from "../schema/user.schema.js";

// router.post(
//   "/",
//   validate(signUpSchema),
//   UserController.createUser
// );

router.get("/", UserController.findUsers);

router.get("/:id", UserController.findUser);

router.patch("/:id", validate(updateUserSchema), UserController.updateUser);

router.delete("/:id", UserController.delUser);

export default router;
