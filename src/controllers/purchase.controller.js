import {
  purchaseList,
  purchaseById,
  purchaseCreate,
  purchaseUpdate,
  purchaseRemove,
} from "../services/purchase.service.js";

const list = async (req, res) => {
  try {
    const allPurchases = await purchaseList();
    return res.status(200).json({ allPurchases });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const purchase = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await purchaseById(id);

    if (!purchase) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }
    return res.status(200).json({ purchase });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const create = async (req, res) => {
  const { supplierId, products, total_amount, payment_method, events_history } =
    req.body;
  try {
    const created = await purchaseCreate(
      supplierId,
      products,
      total_amount,
      payment_method,
      events_history
    );
    return res.status(201).json({
      ok: true,
      message: "La compra se ha registrado correctamente",
      data: created,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ error, message: error.message });
  }
};

const update = async (req, res) => {
  const {
    supplierId,
    products,
    total_amount,
    payment_method,
    events_history: {
      purchase_updated_at: { date, updating_user },
    },
  } = req.body;
  const { id } = req.params;
  try {
    const updated = await purchaseUpdate(
      supplierId,
      products,
      total_amount,
      payment_method,
      date,
      updating_user,
      id
    );
    if (!updated)
      throw new Error(
        "La compra que intenta actualizar no fue encontrada en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "La compra se ha actualizado correctamente",
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
    const deleted = await purchaseRemove(id);
    if (!deleted)
      throw new Error(
        "La compra que desea eliminar no se encontro en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "La compra se ha eliminado correctamente",
      deleted,
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export { list, purchase, create, update, remove };
