import { Purchase } from "../models/purchase.model.js";

const purchaseList = async () => {
  try {
    const allPurchases = await Purchase.find().lean(true);
    return allPurchases;
  } catch (error) {
    console.log(error);
  }
};

const purchaseById = async (id) => {
  try {
    const purchase = await Purchase.findById(id).lean(true);
    if (!purchase) {
      return null;
    }
    return purchase;
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar la compra por ID");
  }
};

const purchaseCreate = async (
  supplierId,
  products,
  total_amount,
  payment_method,
  events_history
) => {
  try {
    const purchase = new Purchase({
      supplierId,
      products,
      total_amount,
      payment_method,
      events_history,
    });
    await purchase.save();
    return purchase;
  } catch (error) {
    console.log(error.message);
  }
};

const purchaseUpdate = async (
  supplierId,
  products,
  total_amount,
  payment_method,
  date,
  updating_user,
  id
) => {
  try {
    const purchase = await Purchase.findById(id);
    if (!purchase) return purchase;
    const updatePurchase = await Purchase.findByIdAndUpdate(
      id,
      {
        $set: {
          supplierId,
          products,
          total_amount,
          payment_method,
        },
        $push: {
          "events_history.purchase_updated_at": {
            date,
            updating_user,
          },
        },
      },
      { returnDocument: "after", new: true }
    );
    return updatePurchase;
  } catch (error) {
    console.log(error);
  }
};

const purchaseRemove = async (id) => {
  try {
    const purchase = await Purchase.findById(id);
    if (!purchase) return purchase;
    const removePurchase = await Purchase.findByIdAndDelete(id);
    return removePurchase;
  } catch (error) {
    console.log(error);
  }
};

export {
  purchaseList,
  purchaseById,
  purchaseCreate,
  purchaseUpdate,
  purchaseRemove,
};
