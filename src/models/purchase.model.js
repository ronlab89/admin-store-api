import mongoose from "mongoose";
import { PaymentMethod } from "./paymentMethod.model.js";
import { Product } from "./product.model.js";
import { Supplier } from "./supplier.model.js";
import { User } from "./user.model.js";

const { Schema } = mongoose;

const purchaseSchema = new Schema({
  supplierId: {
    type: Schema.Types.ObjectId,
    ref: Supplier,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: Product,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      default: {},
      _id: false,
    },
  ],
  total_amount: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: Schema.Types.ObjectId,
    ref: PaymentMethod,
  },
  events_history: {
    purchase_created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    purchase_updated_at: [
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

export const Purchase = mongoose.model("purchase", purchaseSchema);
