import Joi from "joi";
import { SPECIALTY } from "../utils/user.js";

const createAppointmentTypeSchema = Joi.object({
  name: Joi.string().trim().required(),
  specialty: Joi.string().valid(...Object.values(SPECIALTY))
  .required(),
  fee: Joi.number().required(),
});

const updateAppointmentTypeSchema = Joi.object({
  name: Joi.string().trim().optional(),
  specialty: Joi.string()
    .valid(...Object.values(SPECIALTY))
    .optional(),
  fee: Joi.number().optional(),
});

export { createAppointmentTypeSchema, updateAppointmentTypeSchema };