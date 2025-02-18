import {
  customerList,
  customerById,
  customerCreate,
  customerUpdate,
  customerRemove,
} from "../services/customer.service.js";

const list = async (req, res) => {
  try {
    const allCustomers = await customerList();
    return res.status(200).json({ allCustomers });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const customer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await customerById(id);

    if (!customer) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    return res.status(200).json({ customer });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const create = async (req, res) => {
  const { name, surname, email, phone, address, events_history } = req.body;
  try {
    const created = await customerCreate(
      name,
      surname,
      email,
      phone,
      address,
      events_history
    );
    if (created === "Exists")
      throw new Error("Ya existe este cliente en la base de datos");
    return res.status(201).json({
      ok: true,
      message: "El cliente se ha creado correctamente",
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
    surname,
    email,
    phone,
    address,
    events_history: {
      customer_updated_at: { date, updating_user },
    },
  } = req.body;
  const { id } = req.params;
  try {
    const updated = await customerUpdate(
      name,
      surname,
      email,
      phone,
      address,
      date,
      updating_user,
      id
    );
    if (!updated)
      throw new Error(
        "El cliente que intenta actualizar no fue encontrado en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "El cliente se ha actualizado correctamente",
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
    const deleted = await customerRemove(id);
    if (!deleted)
      throw new Error(
        "El cliente que desea eliminar no se encontro en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "El cliente se ha eliminado correctamente",
      deleted,
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export { list, customer, create, update, remove };
