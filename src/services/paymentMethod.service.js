import { PaymentMethod } from "../models/paymentMethod.model.js";

const populateUser = {
  path: "events_history.user",
  select: "name surname email role",
};
const populateUserEditing = {
  path: "events_history.paymentMethod_updated_at.updating_user",
  select: "name surname email role",
};

const paymentMethodList = async () => {
  try {
    const allPaymentMethods = await PaymentMethod.find()
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    return allPaymentMethods;
  } catch (error) {
    console.log(error);
  }
};

const paymentMethodById = async (id) => {
  try {
    const paymentMethod = await PaymentMethod.findById(id)
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    if (!paymentMethod) {
      return null;
    }
    return paymentMethod;
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar el metodo de pago por ID");
  }
};

const paymentMethodCreate = async (name, description, events_history) => {
  try {
    let paymentMethod = await PaymentMethod.findOne({ name });
    if (paymentMethod !== null) return "Exists";
    paymentMethod = new PaymentMethod({
      name,
      description,
      events_history,
    });
    await paymentMethod.save();
    const paymentMethodPopulated = await PaymentMethod.findById(
      paymentMethod._id
    )
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean();
    return paymentMethodPopulated;
  } catch (error) {
    console.log(error.message);
  }
};

const paymentMethodUpdate = async (
  name,
  description,
  date,
  updating_user,
  id
) => {
  try {
    const paymentMethod = await PaymentMethod.findById(id);
    if (!paymentMethod) return paymentMethod;
    const updatePaymentMethod = await PaymentMethod.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          description,
        },
        $push: {
          "events_history.paymentMethod_updated_at": {
            date,
            updating_user,
          },
        },
      },
      { returnDocument: "after", new: true }
    );
    const paymentMethodPopulated = await PaymentMethod.findById(
      updatePaymentMethod._id
    )
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean();
    return paymentMethodPopulated;
  } catch (error) {
    console.log(error);
  }
};

const paymentMethodRemove = async (id) => {
  try {
    const paymentMethod = await PaymentMethod.findById(id);
    if (!paymentMethod) return paymentMethod;
    const removePaymentMethod = await PaymentMethod.findByIdAndDelete(id);
    return removePaymentMethod;
  } catch (error) {
    console.log(error);
  }
};

export {
  paymentMethodList,
  paymentMethodById,
  paymentMethodCreate,
  paymentMethodUpdate,
  paymentMethodRemove,
};
