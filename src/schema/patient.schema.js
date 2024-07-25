import Joi from "joi";

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
  // phoneNumber: Joi.number().required(),
  // password: Joi.string().alphanum().trim().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().lowercase().required(),
  password: Joi.string().required(),
});

export { signUpSchema, loginSchema }; 
