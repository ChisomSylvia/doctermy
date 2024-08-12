import Joi from "joi";
import { DAYS, USER_TYPES, TIME_SLOTS } from "../utils/user.js";

//create users schema
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
    .trim()
    // .required()
    .when("role", {
      is: USER_TYPES.PATIENT,
      then: Joi.required(),
    })
    .when("role", {
      is: USER_TYPES.SUPERADMIN || USER_TYPES.ADMIN || USER_TYPES.DOCTOR,
      then: Joi.required().default("user")
    }),

  specialty: Joi.string().when("role", {
    is: USER_TYPES.DOCTOR,
    then: Joi.required(),
    // otherwise: Joi.forbidden(),
  }),

  availableDays: Joi.array()
    .items(
      Joi.string().valid(
        DAYS.SUNDAY,
        DAYS.MONDAY,
        DAYS.TUESDAY,
        DAYS.WEDNESDAY,
        DAYS.THURSDAY,
        DAYS.FRIDAY,
        DAYS.SATURDAY
      )
    )
    .when("role", {
      is: USER_TYPES.DOCTOR,
      then: Joi.required(),
      // otherwise: Joi.forbidden(),
    }),

  availableTime: Joi.array()
    .items(Joi.string().valid(...TIME_SLOTS))
    .when("role", {
      is: USER_TYPES.DOCTOR,
      then: Joi.required(),
      // otherwise: Joi.forbidden(),
    }),
});

//login users schema
const loginSchema = Joi.object({
  email: Joi.string().lowercase().required(),
  password: Joi.string().required(),
});

//update users schema
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

  imageUrl: Joi.string().optional(),

  specialty: Joi.string().when("role", {
    is: "USER_TYPES.DOCTOR",
    then: Joi.optional(),
    // otherwise: Joi.forbidden(),
  }),

  availableDays: Joi.array()
    .items(
      Joi.string().valid(
        DAYS.SUNDAY,
        DAYS.MONDAY,
        DAYS.TUESDAY,
        DAYS.WEDNESDAY,
        DAYS.THURSDAY,
        DAYS.FRIDAY,
        DAYS.SATURDAY
      )
    )
    .when("role", {
      is: USER_TYPES.DOCTOR,
      then: Joi.optional(),
      // otherwise: Joi.forbidden(),
    }),

  availableTime: Joi.array()
    .items(Joi.string().valid(...TIME_SLOTS))
    .when("role", {
      is: USER_TYPES.DOCTOR,
      then: Joi.optional(),
      // otherwise: Joi.forbidden(),
    }),
});

export { signUpSchema, loginSchema, updateUserSchema };
