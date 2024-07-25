import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  
  reviewText: {
    type: String,
    required: true,
    trim: true,
    unique: false
  },
  
  rating: {
    type: Number,
    required: true,
    unique: false
  },

  patientId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: false,
    trim: true,
    ref: "patient",
  },

}, {
  versionKey: false,
  timestamps: true
}
);

const reviewModel = new model("review", reviewSchema);
export default reviewModel;