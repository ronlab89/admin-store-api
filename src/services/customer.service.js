import { Customer } from "../models/customer.model.js";

const customerList = async () => {
  try {
    const populateUser = {
      path: "events_history.user",
      select: "name surname email role",
    };
    const populateUserEditing = {
      path: "events_history.customer_updated_at.updating_user",
      select: "name surname email role",
    };

    const allCustomers = await Customer.find()
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    return allCustomers;
  } catch (error) {
    console.log(error);
  }
};

const customerById = async (id) => {
  try {
    const customer = await Customer.findById(id).lean(true);
    if (!customer) {
      return null;
    }
    return customer;
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar el cliente por ID");
  }
};

const customerCreate = async (
  name,
  surname,
  email,
  phone,
  address,
  events_history
) => {
  try {
    let customer = await Customer.findOne({ email });
    if (customer !== null) return "Exists";
    customer = new Customer({
      name,
      surname,
      email,
      phone,
      address,
      events_history,
    });
    await customer.save();
    return customer;
  } catch (error) {
    console.log(error.message);
  }
};

const customerUpdate = async (
  name,
  surname,
  email,
  phone,
  address,
  date,
  updating_user,
  id
) => {
  try {
    const customer = await Customer.findById(id);
    if (!customer) return customer;
    const updateCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          surname,
          email,
          phone,
          address,
        },
        $push: {
          "events_history.customer_updated_at": {
            date,
            updating_user,
          },
        },
      },
      { returnDocument: "after", new: true }
    );
    return updateCustomer;
  } catch (error) {
    console.log(error);
  }
};

const customerRemove = async (id) => {
  try {
    const customer = await Customer.findById(id);
    if (!customer) return customer;
    const removeCustomer = await Customer.findByIdAndDelete(id);
    return removeCustomer;
  } catch (error) {
    console.log(error);
  }
};

export {
  customerList,
  customerById,
  customerCreate,
  customerUpdate,
  customerRemove,
};
