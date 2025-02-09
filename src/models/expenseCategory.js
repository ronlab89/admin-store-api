import mongoose from "mongoose";

const { Schema } = mongoose;

const expenseCategorySchema = new Schema({
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
    expenseCategory_created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    expenseCategory_updated_at: [
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

export const ExpenseCategory = mongoose.model(
  "expenseCategory",
  expenseCategorySchema
);
