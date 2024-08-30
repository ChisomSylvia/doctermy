import ReviewService from "../services/review.service.js";

class ReviewController {
  // to create a new review
  async createReview(req, res) {
    const { body } = req;
    const userId = req.user._id;

    body.userId = userId;

    const newReview = await ReviewService.createReview(body);
    return res.status(201).send({
      success: true,
      message: "Review created successfully",
      data: newReview,
    });
  }

  // to get all reviews
  async getReviews(req, res) {
    const reviews = await ReviewService.getReviews();
    return res.status(200).send({
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  }

  // to get one review with an id
  async getOneReview(req, res) {
    const query = { _id: req.params.id };
    const review = await ReviewService.getOneReview(query);
    return res.status(200).send({
      success: true,
      message: "Review retrieved successfully",
      data: review,
    });
  }

  // to update a review
  async updateReview(req, res) {
    const userId = req.user._id;
    const query = { _id: req.params.id, userId: userId };
    const { body } = req;

    //check if review exists
    const foundReview = await ReviewService.getOneReview(query);
    if (!foundReview) {
      return res.status(404).send({
        success: false,
        message: "Review with such ID does not exist",
      });
    }

    //prepare the new update data
    const updatedReview = await ReviewService.updateReview(query, body);
    res.status(200).send({
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    });
  }

  // to delete a review
  async delReview(req, res) {
    const userId = req.user._id;
    const query = { _id: req.params.id, userId: userId };

    //check if review exists
    const foundReview = await ReviewService.getOneReview(query);
    if (!foundReview) {
      return res.status(404).send({
        success: false,
        message: "Review with such ID does not exist",
      });
    }

    //prepare the delete request
    const deletedReview = await ReviewService.delReview(query);
    res.status(200).send({
      success: true,
      message: "Review deleted successfully",
      data: deletedReview,
    });
  }
}

export default new ReviewController();
