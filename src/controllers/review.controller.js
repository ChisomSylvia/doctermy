import ReviewService from "../services/review.service.js";

class ReviewController {
  // to create a new review
  async createReview(req, res) {
    //user created in auth middleware
    // const user = req.user;
    // const reviewData = req.body;
    // const updatedReviewData = {
    //   ...reviewData,
    //   userId: user._id,
    // };
    // const newReview = await ReviewService.createReview(updatedReviewData);

    const reviewData = req.body;
    const userId = req.user._id;

    //   // check if reviewid already exists
    //   const existingReview = await ReviewService.findReview({
    //     userId: reviewData.userId
    //   });
    //   if (existingReview) {
    //       return res.status(404).send({
    //       success: false,
    //       message: "Review already exists",
    //   })
    // }

    const newReview = await ReviewService.createReview({
      ...reviewData,
      userId,
    });
    res.status(201).send({
      success: true,
      message: "Review submitted successfully",
      data: newReview,
    });
  }

  // to get all reviews
  async findReviews(req, res) {
    const reviews = await ReviewService.findReviews();
    res.status(200).send({
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  }

  // to get one review with an id
  async findReview(req, res) {
    const reviewId = req.params.id;
    const review = await ReviewService.findReview(reviewId);
    res.status(200).send({
      success: true,
      message: "Review retrieved successfully",
      data: review,
    });
  }

  // to update a review
  async updateReview(req, res) {
    const reviewId = req.params.id;
    const newData = req.body;
    const updatedReview = await ReviewService.updateReview(reviewId, newData);
    res.status(200).send({
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    });
  }

  // to delete a review
  async delReview(req, res) {
    const reviewId = req.params.id;
    const deletedReview = await ReviewService.delReview(reviewId);
    res.status(200).send({
      success: true,
      message: "Review deleted successfully",
      data: deletedReview,
    });
  }
}

export default new ReviewController();
