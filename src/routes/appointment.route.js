import { Router } from "express";
const router = Router();
import AppointmentController from "../controllers/appointment.controller.js";
import { createAppointmentSchema, updateAppointmentSchema } from "../schema/appointment.schema.js";
import validate from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { USER_TYPES } from "../utils/user.js";

//endpoint to create appointments
router.post(
  "/",
  authenticate([USER_TYPES.PATIENT, USER_TYPES.DOCTOR]),
  validate(createAppointmentSchema),
  AppointmentController.createAppointment
);

//endpoint to get allAppointments
router.get(
  "/",
  authenticate([]),
  AppointmentController.getAllAppointments
);

// router.get(
//   "/query",
//   authenticate([]),
//   AppointmentController.getAppointment
// );

// router.patch(
//   "/:id/status",
//   authenticate([USER_TYPES.PATIENT, USER_TYPES.DOCTOR]),
//   AppointmentController.update
// );

//endpoint to update appointment
router.patch(
  "/:id",
  authenticate([USER_TYPES.PATIENT, USER_TYPES.DOCTOR]),
  validate(updateAppointmentSchema),
  AppointmentController.update
);

export default router;
