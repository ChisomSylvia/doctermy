import { Router } from "express";
const router = Router();
import ReviewController from "../controllers/review.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { createReviewSchema, updateReviewSchema } from "../schema/review.schema.js";
import authenticate from "../middlewares/authenticate.middleware.js";

//create review route
router.post("/", authenticate, validate(createReviewSchema), ReviewController.createReview);

//get all reviews
router.get("/", ReviewController.findReviews);
//get a review
router.get("/:id", ReviewController.findReview);

//update a review
router.patch("/:id", validate(updateReviewSchema), ReviewController.updateReview);

//delete a review
router.delete("/:id", ReviewController.delReview);

export default router;
