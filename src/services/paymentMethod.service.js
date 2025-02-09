import { PaymentMethod } from "../models/paymentMethod.model.js";

const paymentMethodList = async () => {
  try {
    const allPaymentMethods = await PaymentMethod.find().lean(true);
    return allPaymentMethods;
  } catch (error) {
    console.log(error);
  }
};

const paymentMethodById = async (id) => {
  try {
    const paymentMethod = await PaymentMethod.findById(id).lean(true);
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
    return paymentMethod;
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
    return updatePaymentMethod;
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
