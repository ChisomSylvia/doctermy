import { Router } from "express";
const router = Router();
import UserController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { updateUserSchema } from "../schema/user.schema.js";


router.get("/", authenticate([]), UserController.findUsers);

router.get("/:id", authenticate([]), UserController.findUser);

router.patch(
  "/:id",
  authenticate([]),
  validate(updateUserSchema),
  UserController.updateUser
);

router.delete("/:id", authenticate([]), UserController.delUser);

export default router;