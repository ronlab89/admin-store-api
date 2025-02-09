import {
  supplierList,
  supplierById,
  supplierCreate,
  supplierUpdate,
  supplierRemove,
} from "../services/supplier.service.js";

const list = async (req, res) => {
  try {
    const allSupplier = await supplierList();
    return res.status(200).json({ allSupplier });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const supplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await supplierById(id);

    if (!supplier) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    return res.status(200).json({ supplier });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const create = async (req, res) => {
  const { name, contactInfo, address, events_history } = req.body;
  try {
    const created = await supplierCreate(
      name,
      contactInfo,
      address,
      events_history
    );
    if (created === "Exists")
      throw new Error("Ya existe este proveedor en la base de datos");
    return res.status(201).json({
      ok: true,
      message: "El proveedor se ha creado correctamente",
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
    contactInfo,
    address,
    events_history: {
      supplier_updated_at: { date, updating_user },
    },
  } = req.body;
  const { id } = req.params;
  try {
    const updated = await supplierUpdate(
      name,
      contactInfo,
      address,
      date,
      updating_user,
      id
    );
    if (!updated)
      throw new Error(
        "El proveedor que intenta actualizar no fue encontrado en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "El proveedor se ha actualizado correctamente",
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
    const deleted = await supplierRemove(id);
    if (!deleted)
      throw new Error(
        "El proveedor que desea eliminar no se encontro en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "El proveedor se ha eliminado correctamente",
      deleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export { list, supplier, create, update, remove };
