import { Router } from "express";
const router = Router();
import NotificationController from "../controllers/notification.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { USER_TYPES } from "../utils/user.js";


router.get("/",   authenticate([USER_TYPES.PATIENT, USER_TYPES.DOCTOR]), NotificationController.getAllNotifications);
router.get("/:id", authenticate([USER_TYPES.PATIENT, USER_TYPES.DOCTOR]), NotificationController.getOneNotification);

router.patch("/:id", authenticate([USER_TYPES.PATIENT, USER_TYPES.DOCTOR]), NotificationController.updateNotification);

router.delete("/:id", authenticate([USER_TYPES.PATIENT, USER_TYPES.DOCTOR]), NotificationController.delNotification);


export default router;