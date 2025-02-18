import {
  expenseList,
  expenseById,
  expenseCreate,
  expenseUpdate,
  expenseRemove,
} from "../services/expense.service.js";

const list = async (req, res) => {
  try {
    const allExpenses = await expenseList();
    return res.status(200).json({ allExpenses });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const expense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expenseById(id);

    if (!expense) {
      return res.status(404).json({ error: "Gasto no encontrado" });
    }
    return res.status(200).json({ expense });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const create = async (req, res) => {
  const { description, amount, category, payment_method, events_history } =
    req.body;
  try {
    const created = await expenseCreate(
      description,
      amount,
      category,
      payment_method,
      events_history
    );
    return res.status(201).json({
      ok: true,
      message: "El gasto se ha registrado correctamente",
      data: created,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ error, message: error.message });
  }
};

const update = async (req, res) => {
  const {
    description,
    amount,
    category,
    payment_method,
    events_history: {
      expense_updated_at: { date, updating_user },
    },
  } = req.body;
  const { id } = req.params;
  try {
    const updated = await expenseUpdate(
      description,
      amount,
      category,
      payment_method,
      date,
      updating_user,
      id
    );
    if (!updated)
      throw new Error(
        "El gasto que intenta actualizar no fue encontrado en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "El gasto se ha actualizado correctamente",
      updated,
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await expenseRemove(id);
    if (!deleted)
      throw new Error(
        "El gasto que desea eliminar no se encontro en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "El gasto se ha eliminado correctamente",
      deleted,
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export { list, expense, create, update, remove };
