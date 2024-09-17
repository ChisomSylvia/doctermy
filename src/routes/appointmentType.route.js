import { Router } from "express";
const router = Router();
import AppointmentTypeController from "../controllers/appointmentType.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createAppointmentTypeSchema,
  updateAppointmentTypeSchema,
} from "../schema/appointmentType.schema.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { USER_TYPES } from "../utils/user.js";

//create appointment type route
router.post(
  "/",
  authenticate([USER_TYPES.ADMIN]),
  validate(createAppointmentTypeSchema),
  AppointmentTypeController.createAppointmentType
);

//retrieve all appointment types route
router.get(
  "/",
  authenticate([]),
  AppointmentTypeController.getAppointmentTypes
);
//retrieve appointment type route
router.get("/:id", authenticate([]), AppointmentTypeController.getOneAppointmentType);

//update appointment type route
router.patch(
  "/:id",
  authenticate([USER_TYPES.ADMIN]),
  validate(updateAppointmentTypeSchema),
  AppointmentTypeController.updateAppointmentType
);

//soft delete appointment type route
router.patch("/delete/:id", authenticate([USER_TYPES.ADMIN]), AppointmentTypeController.delAppointmentType);

export default router;