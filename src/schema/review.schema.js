import Joi from "joi";

const createReviewSchema = Joi.object({
  reviewText: Joi.string().trim().required(),
  rating: Joi.number().min(0).max(5).required(),
  patientId: Joi.string().required(),
});

const updateReviewSchema = Joi.object({
  reviewText: Joi.string().trim().optional(),
  rating: Joi.number().min(0).max(5).optional(),
  patientId: Joi.string().optional(),
});

export { createReviewSchema, updateReviewSchema };
