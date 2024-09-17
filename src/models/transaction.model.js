import { Schema, model } from "mongoose";
import { PAYMENT_STATUS } from "../utils/user.js";

const transactionSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
    },

    appointmentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "appointment",
    },

    amount: {
      type: Number,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [PAYMENT_STATUS.PAID, PAYMENT_STATUS.NOT_PAID],
      default: PAYMENT_STATUS.NOT_PAID,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const transactionModel = new model("transaction", transactionSchema);
export default transactionModel;