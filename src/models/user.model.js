import { Schema, model } from "mongoose";
import { USER_TYPES } from "../utils/user.js";

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

    specialty: { type: String, default: null },

    imageUrl: { type: String, default: null },

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
