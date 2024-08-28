import Joi from "joi";
import { APPOINTMENT_TYPES, STATUS, TIME_SLOTS } from "../utils/user.js";

const createAppointmentSchema = Joi.object({
  type: Joi.string()
    .valid(
      APPOINTMENT_TYPES.CONSULTATION,
      APPOINTMENT_TYPES.TREATMENT,
      APPOINTMENT_TYPES.SURGERY,
      APPOINTMENT_TYPES.CHECKUP,
      APPOINTMENT_TYPES.LABTEST
    )
    .required(),
  doctorId: Joi.string(),
  patientId: Joi.string(),
  // doctorName: Joi.string(),
  // patientName: Joi.string(),
  timeValue: Joi.string()
    .valid(...TIME_SLOTS)
    .required(),
  date: Joi.date().required(),
  complaint: Joi.string(),
  // status: Joi.string().valid(STATUS.PENDING, STATUS.APPROVED, STATUS.DECLINED).optional()
});

const updateAppointmentSchema = Joi.object({
  type: Joi.string()
    .valid(
      APPOINTMENT_TYPES.CONSULTATION,
      APPOINTMENT_TYPES.TREATMENT,
      APPOINTMENT_TYPES.SURGERY,
      APPOINTMENT_TYPES.CHECKUP,
      APPOINTMENT_TYPES.LABTEST
    )
    .optional(),
  doctorId: Joi.string(),
  patientId: Joi.string(),
  timeValue: Joi.string()
    .valid(...TIME_SLOTS)
    .optional(),
  date: Joi.date().optional(),
  complaint: Joi.string(),
  remark: Joi.string(),
  status: Joi.string().valid(STATUS.PENDING, STATUS.APPROVED, STATUS.DECLINED, STATUS.COMPLETED).optional()
});

export { createAppointmentSchema, updateAppointmentSchema };