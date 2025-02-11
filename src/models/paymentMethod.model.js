import mongoose from "mongoose";
import { User } from "./user.model.js";

const { Schema } = mongoose;

const paymentMethodSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  events_history: {
    paymentMethod_created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    paymentMethod_updated_at: [
      {
        date: {
          type: Date,
          default: null,
        },
        updating_user: {
          type: Schema.Types.ObjectId,
          ref: User,
        },
        defaul: {},
        _id: false,
      },
    ],
  },
});

export const PaymentMethod = mongoose.model(
  "paymentMethod",
  paymentMethodSchema
);
