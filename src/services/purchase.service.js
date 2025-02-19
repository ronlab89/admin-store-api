import { Product } from "../models/product.model.js";
import { Purchase } from "../models/purchase.model.js";

const populateSupplier = {
  path: "supplierId",
  select: "name contactInfo address _id",
};
const populateProducts = {
  path: "products",
  select: "productId quantity price _id",
};
const populatePaymentMethod = {
  path: "payment_method",
  select: "name description _id",
};
const populateUser = {
  path: "events_history.user",
  select: "name surname email role",
};
const populateUserEditing = {
  path: "events_history.purchase_updated_at.updating_user",
  select: "name surname email role",
};

const purchaseList = async () => {
  try {
    const allPurchases = await Purchase.find()
      .populate(populateSupplier)
      .populate(populateProducts)
      .populate(populatePaymentMethod)
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    return allPurchases;
  } catch (error) {
    // console.log(error);
  }
};

const purchaseById = async (id) => {
  try {
    const purchase = await Purchase.findById(id)
      .populate(populateSupplier)
      .populate(populateProducts)
      .populate(populatePaymentMethod)
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    if (!purchase) {
      return null;
    }
    return purchase;
  } catch (error) {
    // console.log(error);
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

    // Update Stock
    for (const product of products) {
      const { productId, quantity } = product;

      // Increment stock
      await Product.findByIdAndUpdate(productId, {
        $inc: { stock: quantity },
      });
    }

    const purchasePopulated = await Purchase.findById(purchase._id)
      .populate(populateSupplier)
      .populate(populateProducts)
      .populate(populatePaymentMethod)
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean();
    return purchasePopulated;
  } catch (error) {
    // console.log(error.message);
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
    const purchasePopulated = await Purchase.findById(updatePurchase._id)
      .populate(populateSupplier)
      .populate(populateProducts)
      .populate(populatePaymentMethod)
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean();
    return purchasePopulated;
  } catch (error) {
    // console.log(error);
  }
};

const purchaseRemove = async (id) => {
  try {
    const purchase = await Purchase.findById(id);
    if (!purchase) return purchase;
    const removePurchase = await Purchase.findByIdAndDelete(id);
    return removePurchase;
  } catch (error) {
    // console.log(error);
  }
};

export {
  purchaseList,
  purchaseById,
  purchaseCreate,
  purchaseUpdate,
  purchaseRemove,
};
