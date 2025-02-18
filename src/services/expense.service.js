import { Expense } from "../models/expense.model.js";

const expenseCategory = {
  path: "category",
  select: "name description _id",
};
const populatePaymentMethod = {
  path: "payment_method",
  select: "name description _id",
};
const populateUser = {
  path: "events_history.user",
  select: "name surname email role",
};
const populateUserEditing = {
  path: "events_history.user_edited_at.updating_user",
  select: "name surname email role",
};

const expenseList = async () => {
  try {
    const allExpenses = await Expense.find()
      .populate(expenseCategory)
      .populate(populatePaymentMethod)
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    return allExpenses;
  } catch (error) {
    // console.log(error);
  }
};

const expenseById = async (id) => {
  try {
    const expense = await Expense.findById(id)
      .populate(expenseCategory)
      .populate(populatePaymentMethod)
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    if (!expense) {
      return null;
    }
    return expense;
  } catch (error) {
    // console.log(error);
    throw new Error("Error al buscar el gasto por ID");
  }
};

const expenseCreate = async (
  description,
  amount,
  category,
  payment_method,
  events_history
) => {
  try {
    const expense = new Expense({
      description,
      amount,
      category,
      payment_method,
      events_history,
    });
    await expense.save();
    const expensePopulated = await Expense.findById(expense._id)
      .populate(expenseCategory)
      .populate(populatePaymentMethod)
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    return expensePopulated;
  } catch (error) {
    // console.log(error.message);
  }
};

const expenseUpdate = async (
  description,
  amount,
  category,
  payment_method,
  date,
  updating_user,
  id
) => {
  try {
    const expense = await Expense.findById(id);
    if (!expense) return expense;
    const updateExpense = await Expense.findByIdAndUpdate(
      id,
      {
        $set: {
          description,
          amount,
          category,
          payment_method,
        },
        $push: {
          "events_history.expense_updated_at": {
            date,
            updating_user,
          },
        },
      },
      { returnDocument: "after", new: true }
    );
    const expensePopulated = await Expense.findById(updateExpense._id)
      .populate(expenseCategory)
      .populate(populatePaymentMethod)
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    return expensePopulated;
  } catch (error) {
    // console.log(error);
  }
};

const expenseRemove = async (id) => {
  try {
    const expense = await Expense.findById(id);
    if (!expense) return expense;
    const removeExpense = await Expense.findByIdAndDelete(id);
    return removeExpense;
  } catch (error) {
    // console.log(error);
  }
};

export {
  expenseList,
  expenseById,
  expenseCreate,
  expenseUpdate,
  expenseRemove,
};
