import { Schema, model } from "mongoose";

const doctorNotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    appointmentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "appointment",
    },

    message: {
      type: String,
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const doctorNotificationModel = new model("doctor_notification", doctorNotificationSchema);
export default doctorNotificationModel;
