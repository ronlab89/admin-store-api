import mongoose from "mongoose";
import { ProductCategory } from "./productCategory.model.js";
import { Supplier } from "./supplier.model.js";
import { User } from "./user.model.js";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: ProductCategory,
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: Supplier,
  },
  events_history: {
    product_created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    product_updated_at: [
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

export const Product = mongoose.model("product", productSchema);
