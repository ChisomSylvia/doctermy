import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    message: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now(),
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const notificationModel = new model("notification", notificationSchema);
export default notificationModel;
