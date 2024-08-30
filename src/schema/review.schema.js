import Joi from "joi";

const createReviewSchema = Joi.object({
  comment: Joi.string().trim().required(),
  rating: Joi.number().min(0).max(5).required(),
});

const updateReviewSchema = Joi.object({
  comment: Joi.string().trim().optional(),
  rating: Joi.number().min(0).max(5).optional(),
});

export { createReviewSchema, updateReviewSchema };