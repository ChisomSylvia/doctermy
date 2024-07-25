import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: false,
    trim: true,
    ref: "patient",
  },

  description: {
    type: String,
    required: true,
    trim: true,
    unique: false
  }
});

const reviewModel = new model("review", reviewSchema);
export default reviewModel;