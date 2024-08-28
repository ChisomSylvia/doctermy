import { Schema, model } from "mongoose";
import { USER_TYPES, GENDER, SPECIALTY, DAYS, TIME_SLOTS } from "../utils/user.js";


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
      enum: Object.values(USER_TYPES),
      default: USER_TYPES.PATIENT,
    },

    gender: {
      type: String,
      enum: Object.values(GENDER),
      default: null
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
      enum: Object.values(SPECIALTY),
    },

    availableDays: {
      type: [String],
      required: function () {
        return this.role === USER_TYPES.DOCTOR;
      },
      enum: Object.values(DAYS),
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
    timestamps: true
  }
);


const userModel = new model("user", userSchema);
export default userModel;