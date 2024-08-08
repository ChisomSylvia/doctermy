import Joi from "joi";
import { APPOINTMENT_TYPES, STATUS } from "../utils/user.js";

const createAppointmentSchema = Joi.object({
  type: Joi.string().valid(APPOINTMENT_TYPES.CONSULTATION, APPOINTMENT_TYPES.TREATMENT, APPOINTMENT_TYPES.SURGERY, APPOINTMENT_TYPES.CHECKUP, APPOINTMENT_TYPES.LABTEST),
  doctorId: Joi.string(),
  patientId: Joi.string(),
  date: Joi.date(),
  status: Joi.string().valid(STATUS.PENDING, STATUS.APPROVED, STATUS.DECLINED).optional()
})

const updateAppointmentSchema = Joi.object({
  type: Joi.string().valid(APPOINTMENT_TYPES.CONSULTATION, APPOINTMENT_TYPES.TREATMENT, APPOINTMENT_TYPES.SURGERY, APPOINTMENT_TYPES.CHECKUP, APPOINTMENT_TYPES.LABTEST),
  doctorId: Joi.string(),
  date: Joi.date(),
  status: Joi.string().valid(STATUS.PENDING, STATUS.APPROVED, STATUS.DECLINED).optional()
})

export { createAppointmentSchema, updateAppointmentSchema };