import {
  expenseCategoryList,
  expenseCategoryById,
  expenseCategoryCreate,
  expenseCategoryUpdate,
  expenseCategoryRemove,
} from "../services/expenseCategory.service.js";

const list = async (req, res) => {
  try {
    const allExpenseCategorys = await expenseCategoryList();
    return res.status(200).json({ allExpenseCategorys });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const expenseCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const expenseCategory = await expenseCategoryById(id);

    if (!expenseCategory) {
      return res
        .status(404)
        .json({ error: "Categoria de gasto no encontrada" });
    }
    return res.status(200).json({ expenseCategory });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const create = async (req, res) => {
  const { name, description, events_history } = req.body;
  try {
    const created = await expenseCategoryCreate(
      name,
      description,
      events_history
    );
    if (created === "Exists")
      throw new Error("Ya existe esta Categoria de gasto en la base de datos");
    return res.status(201).json({
      ok: true,
      message: "La Categoria de gasto se ha creado correctamente",
      data: created,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: error.message });
  }
};

const update = async (req, res) => {
  const {
    name,
    description,
    events_history: {
      expenseCategory_updated_at: { date, updating_user },
    },
  } = req.body;
  const { id } = req.params;
  try {
    const updated = await expenseCategoryUpdate(
      name,
      description,
      date,
      updating_user,
      id
    );
    if (!updated)
      throw new Error(
        "La Categoria de gasto que intenta actualizar no fue encontrada en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "La Categoria de gasto se ha actualizado correctamente",
      updated,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await expenseCategoryRemove(id);
    if (!deleted)
      throw new Error(
        "La Categoria de gasto que desea eliminar no se encontro en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "La Categoria de gasto se ha eliminado correctamente",
      deleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export { list, expenseCategory, create, update, remove };
