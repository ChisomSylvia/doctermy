import { Schema, model } from "mongoose";
import {
  APPOINTMENT_TYPES,
  STATUS,
  USER_TYPES,
  // TIME_SLOTS,
} from "../utils/user.js";

const appointmentSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        APPOINTMENT_TYPES.CONSULTATION,
        APPOINTMENT_TYPES.TREATMENT,
        APPOINTMENT_TYPES.SURGERY,
        APPOINTMENT_TYPES.CHECKUP,
        APPOINTMENT_TYPES.LABTEST,
      ],
      default: APPOINTMENT_TYPES.CONSULTATION,
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    patientId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user"
    },

    status: {
      type: String,
      enum: [
        STATUS.PENDING,
        STATUS.APPROVED,
        STATUS.DECLINED,
        STATUS.COMPLETED,
      ],
      default: STATUS.PENDING,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      // default: null,
    },

    complaint: {
      type: String,
      default: null,
    },

    doctorUpdatedAt: {
      type: Date,
      // default: null,
    },

    bookedBy: {
      type: String,
      enum: [USER_TYPES.DOCTOR, USER_TYPES.PATIENT],
    },

    remark: {
      type: String,
      // default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const appointmentModel = new model("appointment", appointmentSchema);
export default appointmentModel;
