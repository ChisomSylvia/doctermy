import { Schema, model } from "mongoose";
import { DAYS, TIME_SLOTS } from "../utils/user.js";

const availabilitySchema = new Schema(
  {
    days: {
      type: String,
      required: true,
      enum: [
        DAYS.SUNDAY,
        DAYS.MONDAY,
        DAYS.TUESDAY,
        DAYS.WEDNESDAY,
        DAYS.THURSDAY,
        DAYS.FRIDAY,
        DAYS.SATURDAY,
      ],
      default: [
        DAYS.SUNDAY,
        DAYS.MONDAY,
        DAYS.TUESDAY,
        DAYS.WEDNESDAY,
        DAYS.THURSDAY,
        DAYS.FRIDAY,
        DAYS.SATURDAY,
      ],
    },

    time: {
      type: String,
      required: true,
      enum: [
        [TIME_SLOTS.MORNING_SLOTS],
        [TIME_SLOTS.AFTERNOON_SOTS],
        [TIME_SLOTS.EVENING_SLOTS],
      ],
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
  
);

const availabilityModel = new model("user", availabilitySchema);
export default availabilityModel;
