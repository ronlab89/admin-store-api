import { Product } from "../models/product.model.js";
import { Sale } from "../models/sale.model.js";

const populateCustomer = {
  path: "customerId",
  select: "name surname email phone address _id",
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
  path: "events_history.sale_updated_at.updating_user",
  select: "name surname email role",
};

const saleList = async () => {
  try {
    const allSales = await Sale.find()
      .populate(populateUser)
      .populate(populateUserEditing)
      .populate(populateCustomer)
      .populate(populateProducts)
      .populate(populatePaymentMethod)
      .lean(true);
    return allSales;
  } catch (error) {
    // console.log(error);
  }
};

const saleById = async (id) => {
  try {
    const sale = await Sale.findById(id)
      .populate(populateUser)
      .populate(populateUserEditing)
      .populate(populateCustomer)
      .populate(populateProducts)
      .populate(populatePaymentMethod)
      .lean(true);
    if (!sale) {
      return null;
    }
    return sale;
  } catch (error) {
    // console.log(error);
    throw new Error("Error al buscar la venta por ID");
  }
};

const saleCreate = async (
  customerId,
  products,
  total_amount,
  payment_method,
  events_history
) => {
  try {
    // check stock
    for (const product of products) {
      const { productId, quantity } = product;

      const productData = await Product.findById(productId);
      if (!productData || productData.stock < quantity) {
        throw new Error(
          `Stock insuficiente para el producto: ${productData?.name}`
        );
      }
    }
    // Make Sale
    const sale = new Sale({
      customerId,
      products,
      total_amount,
      payment_method,
      events_history,
    });
    await sale.save();

    // Update Stock
    for (const product of products) {
      const { productId, quantity } = product;

      await Product.findByIdAndUpdate(productId, {
        $inc: { stock: -quantity }, // decrement stock
      });
    }
    // Populate Sale
    const salePopulated = await Sale.findById(sale._id)
      .populate(populateUser)
      .populate(populateUserEditing)
      .populate(populateCustomer)
      .populate(populateProducts)
      .populate(populatePaymentMethod)
      .lean();

    // Return Sale
    return salePopulated;
  } catch (error) {
    // console.error("Error al crear la venta:", error.message);
    throw new Error(error.message || "Error al crear la venta");
  }
};

const saleUpdate = async (
  customerId,
  products,
  total_amount,
  payment_method,
  date,
  updating_user,
  id
) => {
  try {
    const sale = await Sale.findById(id);
    if (!sale) return sale;
    const updateSale = await Sale.findByIdAndUpdate(
      id,
      {
        $set: {
          customerId,
          products,
          total_amount,
          payment_method,
        },
        $push: {
          "events_history.sale_updated_at": {
            date,
            updating_user,
          },
        },
      },
      { returnDocument: "after", new: true }
    );
    const salePopulated = await Sale.findById(updateSale._id)
      .populate(populateUser)
      .populate(populateUserEditing)
      .populate(populateCustomer)
      .populate(populateProducts)
      .populate(populatePaymentMethod)
      .lean();
    return salePopulated;
  } catch (error) {
    // console.log(error);
  }
};

const saleRemove = async (id) => {
  try {
    const sale = await Sale.findById(id);
    if (!sale) return sale;
    const removeSale = await Sale.findByIdAndDelete(id);
    return removeSale;
  } catch (error) {
    // console.log(error);
  }
};

export { saleList, saleById, saleCreate, saleUpdate, saleRemove };
