import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    addressline: { type: String },
    city: { type: String },
    province: { type: String },
    country: { type: String },
    default: {},
  },
  events_history: {
    customer_created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    customer_updated_at: [
      {
        date: { type: Date },
        updating_user: { type: Schema.Types.ObjectId, ref: "User" },
        default: {},
        _id: false,
      },
    ],
  },
});

export const Customer = mongoose.model("customer", customerSchema);
