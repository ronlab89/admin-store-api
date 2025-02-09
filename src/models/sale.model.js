import mongoose from "mongoose";

const { Schema } = mongoose;

const saleSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
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
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  total_amount: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: Schema.Types.ObjectId,
    ref: "PaymentMethod",
  },
  events_history: {
    sale_created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sale_updated_at: [
      {
        date: {
          type: Date,
          default: null,
        },
        updating_user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        defaul: {},
        _id: false,
      },
    ],
  },
});

export const Sale = mongoose.model("sale", saleSchema);
