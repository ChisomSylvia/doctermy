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

//endpoint to get one appointment
router.get(
  "/:id",
  authenticate([]),
  AppointmentController.getOneAppointment
);

//endpoint to update appointment
router.patch(
  "/update",
  authenticate([USER_TYPES.PATIENT]),
  validate(updateAppointmentSchema),
  AppointmentController.updateAppointment
);
//endpoint to update status
router.patch("/update-status", authenticate([USER_TYPES.DOCTOR]), AppointmentController.updateStatus);


export default router;