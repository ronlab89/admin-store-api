import { ExpenseCategory } from "../models/expenseCategory.model.js";

const populateUser = {
  path: "events_history.user",
  select: "name surname email role",
};
const populateUserEditing = {
  path: "events_history.expenseCategory_updated_at.updating_user",
  select: "name surname email role",
};

const expenseCategoryList = async () => {
  try {
    const allExpenseCategorys = await ExpenseCategory.find()
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    return allExpenseCategorys;
  } catch (error) {
    console.log(error);
  }
};

const expenseCategoryById = async (id) => {
  try {
    const expenseCategory = await ExpenseCategory.findById(id)
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    if (!expenseCategory) {
      return null;
    }
    return expenseCategory;
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar la categoria de gasto por ID");
  }
};

const expenseCategoryCreate = async (name, description, events_history) => {
  try {
    let expenseCategory = await ExpenseCategory.findOne({ name });
    if (expenseCategory !== null) return "Exists";
    expenseCategory = new ExpenseCategory({
      name,
      description,
      events_history,
    });
    await expenseCategory.save();
    const expenseCategoryPopulated = await ExpenseCategory.findById(
      expenseCategory._id
    )
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean();
    return expenseCategoryPopulated;
  } catch (error) {
    console.log(error.message);
  }
};

const expenseCategoryUpdate = async (
  name,
  description,
  date,
  updating_user,
  id
) => {
  try {
    const expenseCategory = await ExpenseCategory.findById(id);
    if (!expenseCategory) return expenseCategory;
    const updateExpenseCategory = await ExpenseCategory.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          description,
        },
        $push: {
          "events_history.expenseCategory_updated_at": {
            date,
            updating_user,
          },
        },
      },
      { returnDocument: "after", new: true }
    );
    const expenseCategoryPopulated = await ExpenseCategory.findById(
      updateExpenseCategory._id
    )
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean();
    return expenseCategoryPopulated;
  } catch (error) {
    console.log(error);
  }
};

const expenseCategoryRemove = async (id) => {
  try {
    const expenseCategory = await ExpenseCategory.findById(id);
    if (!expenseCategory) return expenseCategory;
    const removeExpenseCategory = await ExpenseCategory.findByIdAndDelete(id);
    return removeExpenseCategory;
  } catch (error) {
    console.log(error);
  }
};

export {
  expenseCategoryList,
  expenseCategoryById,
  expenseCategoryCreate,
  expenseCategoryUpdate,
  expenseCategoryRemove,
};
