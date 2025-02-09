import { Expense } from "../models/expense.model.js";

const expenseList = async () => {
  try {
    const allExpenses = await Expense.find().lean(true);
    return allExpenses;
  } catch (error) {
    console.log(error);
  }
};

const expenseById = async (id) => {
  try {
    const expense = await Expense.findById(id).lean(true);
    if (!expense) {
      return null;
    }
    return expense;
  } catch (error) {
    console.log(error);
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
    return expense;
  } catch (error) {
    console.log(error.message);
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
    return updateExpense;
  } catch (error) {
    console.log(error);
  }
};

const expenseRemove = async (id) => {
  try {
    const expense = await Expense.findById(id);
    if (!expense) return expense;
    const removeExpense = await Expense.findByIdAndDelete(id);
    return removeExpense;
  } catch (error) {
    console.log(error);
  }
};

export {
  expenseList,
  expenseById,
  expenseCreate,
  expenseUpdate,
  expenseRemove,
};
