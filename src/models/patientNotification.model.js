import { Schema, model } from "mongoose";

const patientNotificationSchema = new Schema(
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

const patientNotificationModel = new model("patient_notification", patientNotificationSchema);
export default patientNotificationModel;