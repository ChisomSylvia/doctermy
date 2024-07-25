import { Schema, model } from "mongoose";

const patientSchema = new Schema(
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
  },
  {
    versionKey: false,
    // timestamps: true,
    timestamps: {currentTime: () => new Date().toLocaleString()},
  }
);

const patientModel = new model("patient", patientSchema);
export default patientModel;
