import {
  paymentMethodList,
  paymentMethodById,
  paymentMethodCreate,
  paymentMethodUpdate,
  paymentMethodRemove,
} from "../services/paymentMethod.service.js";

const list = async (req, res) => {
  try {
    const allPaymentMethods = await paymentMethodList();
    return res.status(200).json({ allPaymentMethods });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const paymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentMethod = await paymentMethodById(id);

    if (!paymentMethod) {
      return res.status(404).json({ error: "Metodo de pago no encontrado" });
    }
    return res.status(200).json({ paymentMethod });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const create = async (req, res) => {
  const { name, description, events_history } = req.body;
  try {
    const created = await paymentMethodCreate(
      name,
      description,
      events_history
    );
    if (created === "Exists")
      throw new Error("Ya existe este Metodo de pago en la base de datos");
    return res.status(201).json({
      ok: true,
      message: "El Metodo de pago se ha creado correctamente",
      data: created,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ error, message: error.message });
  }
};

const update = async (req, res) => {
  const {
    name,
    description,
    events_history: {
      paymentMethod_updated_at: { date, updating_user },
    },
  } = req.body;
  const { id } = req.params;
  try {
    const updated = await paymentMethodUpdate(
      name,
      description,
      date,
      updating_user,
      id
    );
    if (!updated)
      throw new Error(
        "El Metodo de pago que intenta actualizar no fue encontrado en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "El Metodo de pago se ha actualizado correctamente",
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
    const deleted = await paymentMethodRemove(id);
    if (!deleted)
      throw new Error(
        "El Metodo de pago que desea eliminar no se encontro en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "El Metodo de pago se ha eliminado correctamente",
      deleted,
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export { list, paymentMethod, create, update, remove };
