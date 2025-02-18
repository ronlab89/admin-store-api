import {
  saleList,
  saleById,
  saleCreate,
  saleUpdate,
  saleRemove,
} from "../services/sale.service.js";

const list = async (req, res) => {
  try {
    const allSales = await saleList();
    return res.status(200).json({ allSales });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const sale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await saleById(id);

    if (!sale) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }
    return res.status(200).json({ sale });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const create = async (req, res) => {
  const { customerId, products, total_amount, payment_method, events_history } =
    req.body;
  try {
    const created = await saleCreate(
      customerId,
      products,
      total_amount,
      payment_method,
      events_history
    );
    return res.status(201).json({
      ok: true,
      message: "La venta se ha registrado correctamente",
      data: created,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ error, message: error.message });
  }
};

const update = async (req, res) => {
  const {
    customerId,
    products,
    total_amount,
    payment_method,
    events_history: {
      sale_updated_at: { date, updating_user },
    },
  } = req.body;
  const { id } = req.params;
  try {
    const updated = await saleUpdate(
      customerId,
      products,
      total_amount,
      payment_method,
      date,
      updating_user,
      id
    );
    if (!updated)
      throw new Error(
        "La venta que intenta actualizar no fue encontrada en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "La venta se ha actualizado correctamente",
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
    const deleted = await saleRemove(id);
    if (!deleted)
      throw new Error(
        "La venta que desea eliminar no se encontro en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "La venta se ha eliminado correctamente",
      deleted,
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export { list, sale, create, update, remove };
