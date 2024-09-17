import { Schema, model } from "mongoose";
import { SPECIALTY } from "../utils/user.js";

const appointmentTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    specialty: {
      type: String,
      required: true,
      enum: Object.values(SPECIALTY),
      default: SPECIALTY.ORTHOPEDICS,
    },

    fee: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AppointmentTypeModel = new model(
  "appointment_type",
  appointmentTypeSchema
);
export default AppointmentTypeModel;