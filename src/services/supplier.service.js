import { Supplier } from "../models/supplier.model.js";

const populateUser = {
  path: "events_history.user",
  select: "name surname email role",
};
const populateUserEditing = {
  path: "events_history.supplier_updated_at.updating_user",
  select: "name surname email role",
};

const supplierList = async () => {
  try {
    const allSuppliers = await Supplier.find()
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    return allSuppliers;
  } catch (error) {
    // console.log(error);
  }
};

const supplierById = async (id) => {
  try {
    const supplier = await Supplier.findById(id)
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    if (!supplier) {
      return null;
    }
    return supplier;
  } catch (error) {
    // console.log(error);
    throw new Error("Error al buscar el proveedor por ID");
  }
};

const supplierCreate = async (name, contactInfo, address, events_history) => {
  try {
    let supplier = await Supplier.findOne({ name });
    if (supplier !== null) return "Exists";
    supplier = new Supplier({
      name,
      contactInfo,
      address,
      events_history,
    });
    await supplier.save();
    const supplierPopulated = await Supplier.findById(supplier._id)
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean();
    return supplierPopulated;
  } catch (error) {
    // console.log(error.message);
  }
};

const supplierUpdate = async (
  name,
  contactInfo,
  address,
  date,
  updating_user,
  id
) => {
  try {
    const supplier = await Supplier.findById(id);
    if (!supplier) return supplier;
    const updateSupplier = await Supplier.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          contactInfo,
          address,
        },
        $push: {
          "events_history.supplier_updated_at": {
            date,
            updating_user,
          },
        },
      },
      { returnDocument: "after", new: true }
    );
    const supplierPopulated = await Supplier.findById(updateSupplier._id)
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean();
    return supplierPopulated;
  } catch (error) {
    // console.log(error);
  }
};

const supplierRemove = async (id) => {
  try {
    const supplier = await Supplier.findById(id);
    if (!supplier) return supplier;
    const removeSupplier = await Supplier.findByIdAndDelete(id);
    return removeSupplier;
  } catch (error) {
    // console.log(error);
  }
};

export {
  supplierList,
  supplierById,
  supplierCreate,
  supplierUpdate,
  supplierRemove,
};
