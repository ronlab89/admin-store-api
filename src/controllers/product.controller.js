import {
  productList,
  productById,
  productCreate,
  productUpdate,
  productRemove,
} from "../services/product.service.js";

const list = async (req, res) => {
  try {
    const allProducts = await productList();
    return res.status(200).json({ allProducts });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const product = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productById(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const create = async (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    category,
    supplier,
    events_history,
  } = req.body;
  try {
    const created = await productCreate(
      name,
      description,
      price,
      stock,
      category,
      supplier,
      events_history
    );
    if (created === "Exists")
      throw new Error("Ya existe este producto en la base de datos");
    return res.status(201).json({
      ok: true,
      message: "El producto se ha creado correctamente",
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
    price,
    stock,
    category,
    supplier,
    events_history: {
      product_updated_at: { date, updating_user },
    },
  } = req.body;
  const { id } = req.params;
  try {
    const updated = await productUpdate(
      name,
      description,
      price,
      stock,
      category,
      supplier,
      date,
      updating_user,
      id
    );
    if (!updated)
      throw new Error(
        "El producto que intenta actualizar no fue encontrado en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "El producto se ha actualizado correctamente",
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
    const deleted = await productRemove(id);
    if (!deleted)
      throw new Error(
        "El producto que desea eliminar no se encontro en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "El producto se ha eliminado correctamente",
      deleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export { list, product, create, update, remove };
