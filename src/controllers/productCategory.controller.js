import {
  productCategoryList,
  productCategoryById,
  productCategoryCreate,
  productCategoryUpdate,
  productCategoryRemove,
} from "../services/productCategory.service.js";

const list = async (req, res) => {
  try {
    const allProductCategorys = await productCategoryList();
    return res.status(200).json({ allProductCategorys });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const productCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const productCategory = await productCategoryById(id);

    if (!productCategory) {
      return res
        .status(404)
        .json({ error: "Categoria de producto no encontrada" });
    }
    return res.status(200).json({ productCategory });
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
    const created = await productCategoryCreate(
      name,
      description,
      events_history
    );
    if (created === "Exists")
      throw new Error(
        "Ya existe esta Categoria de producto en la base de datos"
      );
    return res.status(201).json({
      ok: true,
      message: "La Categoria de producto se ha creado correctamente",
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
      productCategory_updated_at: { date, updating_user },
    },
  } = req.body;
  const { id } = req.params;
  try {
    const updated = await productCategoryUpdate(
      name,
      description,
      date,
      updating_user,
      id
    );
    if (!updated)
      throw new Error(
        "La Categoria de producto que intenta actualizar no fue encontrada en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "La Categoria de producto se ha actualizado correctamente",
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
    const deleted = await productCategoryRemove(id);
    if (!deleted)
      throw new Error(
        "La Categoria de producto que desea eliminar no se encontro en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "La Categoria de producto se ha eliminado correctamente",
      deleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export { list, productCategory, create, update, remove };
