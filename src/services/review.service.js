import reviewModel from "../models/review.model.js";

class ReviewService {
  // create new review
  async createReview(review) {
    const newReview = await reviewModel.create(review);
    return newReview;
  }

  // retrieve all reviews
  async getReviews() {
    const reviews = await reviewModel.find().populate("userId", "name role");
    return reviews;
  }

  // retrieve one review
  async getOneReview(query) {
    const review = await reviewModel
      .findOne(query)
      .populate("userId", "name role");
    return review;
  }

  // update a review by id
  async updateReview(query, data) {
    const updatedReview = await reviewModel.findOneAndUpdate(query, data, {
      new: true,
    });
    return updatedReview;
  }

  // delete user by id
  async delReview(query) {
    const deletedReview = await reviewModel.findOneAndDelete(query);
    return deletedReview;
  }
}

export default new ReviewService();