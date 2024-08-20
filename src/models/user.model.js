import { Schema, model } from "mongoose";
import { USER_TYPES, DAYS, TIME_SLOTS } from "../utils/user.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: false,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      unique: false,
    },

    role: {
      type: String,
      required: true,
      enum: [
        USER_TYPES.PATIENT,
        USER_TYPES.DOCTOR,
        USER_TYPES.ADMIN,
        USER_TYPES.SUPERADMIN,
      ],
      default: USER_TYPES.PATIENT,
    },

    uniqueId: { type: String, default: null },

    address: { type: String, default: null },

    dateOfBirth: { type: Date, default: null },

    imageUrl: { type: String, default: null },

    specialty: {
      type: String,
      required: function () {
        return this.role === USER_TYPES.DOCTOR;
      },
    },

    availableDays: {
      type: [String],
      required: function () {
        return this.role === USER_TYPES.DOCTOR;
      },
      enum: [
        DAYS.SUNDAY,
        DAYS.MONDAY,
        DAYS.TUESDAY,
        DAYS.WEDNESDAY,
        DAYS.THURSDAY,
        DAYS.FRIDAY,
        DAYS.SATURDAY,
      ],
    },

    availableTime: {
      type: [String],
      required: function () {
        return this.role === USER_TYPES.DOCTOR;
      },
      enum: TIME_SLOTS,
    },
  },
  {
    strict: false,
    versionKey: false,
    timestamps: true,
    // timestamps: { currentTime: () => new Date().toLocaleString() },
  }
);

const userModel = new model("user", userSchema);
export default userModel;
