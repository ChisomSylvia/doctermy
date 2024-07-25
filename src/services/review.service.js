import reviewModel from "../models/review.model.js";

class ReviewService {
  // create new review
  async createReview(review) {
    const newReview = await reviewModel.create(review);
    return newReview;
  }

  // retrieve one review
  async findReview(id) {
    const review = await reviewModel.findById(id);
    return review;
  }

  // retrieve all reviews
  async findReviews() {
    const reviews = await reviewModel.find().populate("patientId", "name");
    return reviews;
  }

  // update a patient by id
  async updateReview(id, data) {
    const updatedReview = await reviewModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedReview;
  }

  // delete patient by id
  async delReview(id) {
    const deletedReview = await reviewModel.findByIdAndDelete(id);
    return deletedReview;
  }
}

export default new ReviewService();