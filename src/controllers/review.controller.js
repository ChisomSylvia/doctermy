import ReviewService from "../services/review.service.js";

class ReviewController {
  // to create a new review
  async createReview(req, res) {
    const reviewData = req.body;
    const patientId = req.user._id;
    const newReview = await ReviewService.createReview({...reviewData, patientId});
    res.status(201).send({
      success: true,
      message: "Review submitted successfully",
      newReview,
    });
  }

  // to get one review with an id
  async findReview(req, res) {
    const reviewId = req.params.id;
    const review = await ReviewService.findReview(reviewId);
    res.status(200).send({
      success: true,
      message: "Review retrieved successfully",
      review,
    });
  }

  // to get all reviews
  async findReviews(req, res) {
    const reviews = await ReviewService.findReviews();
    res.status(200).send({
      success: true,
      message: "Reviews retrieved successfully",
      reviews,
    });
  }

  // to update a review
  async updateReview(req, res) {
    const reviewId = req.params.id;
    const newData = req.body;
    const updatedReview = await ReviewService.updateReview(reviewId, newData);
    res.status(200).send({
      success: true,
      message: 'Review updated successfully',
      updatedReview,
    });
  }

  // to delete a review
  async delReview(req, res) {
    const reviewId = req.params.id;
    const deletedReview = await ReviewService.delReview(reviewId);
    res.status(200).send({
      success: true,
      message: "Review deleted successfully",
      deletedReview,
    });
  }
}

export default new ReviewController();
