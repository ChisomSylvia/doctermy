import Joi from "joi";
import { USER_TYPES } from "../utils/user.js";

const signUpSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email().lowercase().required(),
  phoneNumber: Joi.string()
    .pattern(new RegExp(/^(?:\+?234|0)?[789]\d{9}$/))
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,30}$/
      )
    )
    .required(),
  userType: Joi.string()
    .optional()
    .valid(USER_TYPES.PATIENT, USER_TYPES.DOCTOR, USER_TYPES.ADMIN),
});

const loginSchema = Joi.object({
  email: Joi.string().lowercase().required(),
  password: Joi.string().required(),
});

export { signUpSchema, loginSchema };
