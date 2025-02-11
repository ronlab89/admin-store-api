import mongoose from "mongoose";
import { ExpenseCategory } from "./expenseCategory.model.js";
import { PaymentMethod } from "./paymentMethod.model.js";
import { User } from "./user.model.js";

const { Schema } = mongoose;

const expenseSchema = new Schema({
  description: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: ExpenseCategory,
  },
  payment_method: {
    type: Schema.Types.ObjectId,
    ref: PaymentMethod,
  },
  events_history: {
    expense_created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    expense_updated_at: [
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

export const Expense = mongoose.model("expense", expenseSchema);
