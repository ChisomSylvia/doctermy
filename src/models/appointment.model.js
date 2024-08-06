import { Schema, model } from "mongoose";
import { APPOINTMENT_TYPES, STATUS } from "../utils/user.js";

const appointmentSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: [APPOINTMENT_TYPES.CONSULTATION, APPOINTMENT_TYPES.TREATMENT, APPOINTMENT_TYPES.SURGERY, APPOINTMENT_TYPES.CHECKUP, APPOINTMENT_TYPES.LABTEST],
    default: APPOINTMENT_TYPES.CONSULTATION
  },

  doctorId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: false,
    ref: "user",
    default: null,
  },

  patientId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: false,
    ref: "user",
    default: null
  },

  status: {
    type: String,
    enum: [STATUS.PENDING, STATUS.APPROVED, STATUS.DECLINED],
    default: STATUS.PENDING
  },

  date: {
    type: Date,
    default: null
  },

  startTime: {
    type: Date,
    default: null
  },

  endTime: {
    type: Date,
    default: null
  },

  doctorUpdatedAt: {
    type: Date,
    default: null
  }
});

const appointmentModel = new model("apppointment", appointmentSchema);
export default appointmentModel;
