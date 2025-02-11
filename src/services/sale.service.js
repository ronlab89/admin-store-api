import { Sale } from "../models/sale.model.js";

const saleList = async () => {
  try {
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
    const allSales = await Sale.find()
      .populate(populateUser)
      .populate(populateUserEditing)
      .populate(populateCustomer)
      .populate(populateProducts)
      .populate(populatePaymentMethod)
      .lean(true);
    return allSales;
  } catch (error) {
    console.log(error);
  }
};

const saleById = async (id) => {
  try {
    const sale = await Sale.findById(id).lean(true);
    if (!sale) {
      return null;
    }
    return sale;
  } catch (error) {
    console.log(error);
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
    const sale = new Sale({
      customerId,
      products,
      total_amount,
      payment_method,
      events_history,
    });
    await sale.save();
    return sale;
  } catch (error) {
    console.log(error.message);
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
    return updateSale;
  } catch (error) {
    console.log(error);
  }
};

const saleRemove = async (id) => {
  try {
    const sale = await Sale.findById(id);
    if (!sale) return sale;
    const removeSale = await Sale.findByIdAndDelete(id);
    return removeSale;
  } catch (error) {
    console.log(error);
  }
};

export { saleList, saleById, saleCreate, saleUpdate, saleRemove };
