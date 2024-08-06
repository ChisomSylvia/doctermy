import Joi from "joi";
// import { USER_TYPES } from "../utils/user.js";

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
    specialty: Joi.string().optional()
});

const loginSchema = Joi.object({
  email: Joi.string().lowercase().required(),
  password: Joi.string().required(),
});


const updateUserSchema = Joi.object({
  email: Joi.string().trim().email().lowercase().optional(),
  phoneNumber: Joi.string()
    .pattern(new RegExp(/^(?:\+?234|0)?[789]\d{9}$/))
    .optional(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,30}$/
      )
    )
    .optional(),

  uniqueId: Joi.string().optional(),

  address: Joi.string().optional(),

  dateOfBirth: Joi.date().optional(),

  specialty: Joi.string().when("userType", {
    is: "USER_TYPES.DOCTOR",
    then: Joi.optional(),
  }),

  imageUrl: Joi.string().optional(),
});



export { signUpSchema, loginSchema, updateUserSchema };
