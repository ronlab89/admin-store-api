import mongoose from "mongoose";
import { User } from "./user.model.js";

const { Schema } = mongoose;

const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contactInfo: {
    phone: { type: String },
    email: { type: String },
    website: { type: String },
    default: {},
  },
  address: {
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    province: { type: String },
    province_code: { type: String },
    country: { type: String },
    country_code: { type: String },
    zip: { type: String },
    default: {},
  },
  events_history: {
    supplier_created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    supplier_updated_at: [
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

export const Supplier = mongoose.model("supplier", supplierSchema);
