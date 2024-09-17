import Joi from "joi";
import { STATUS, TIME_SLOTS } from "../utils/user.js";


//create appointment schema
const createAppointmentSchema = Joi.object({
  typeId: Joi.string().required(),
  doctorId: Joi.string(),
  patientId: Joi.string(),
  timeValue: Joi.string()
    .valid(...TIME_SLOTS)
    .required(),
  date: Joi.date().required(),
  complaint: Joi.string(),
});


//update appointment schema
const updateAppointmentSchema = Joi.object({
  typeId: Joi.string(),
  doctorId: Joi.string(),
  patientId: Joi.string(),
  timeValue: Joi.string()
    .valid(...TIME_SLOTS)
    .optional(),
  date: Joi.date().optional(),
  complaint: Joi.string(),
  remark: Joi.string(),
  // status: Joi.string().valid(STATUS.PENDING, STATUS.APPROVED, STATUS.DECLINED, STATUS.COMPLETED).optional()
});


export { createAppointmentSchema, updateAppointmentSchema };