import Joi from "joi";
import { APPOINTMENT_TYPES } from "../utils/user.js";

const createAppointmentSchema = Joi.object({
  type: Joi.string().optional().valid(APPOINTMENT_TYPES.CONSULTATION, APPOINTMENT_TYPES.TREATMENT, APPOINTMENT_TYPES.SURGERY, APPOINTMENT_TYPES.CHECKUP, APPOINTMENT_TYPES.LABTEST),
  doctorId: Joi.string().required(),
  date: Joi.date()
})

export { createAppointmentSchema };