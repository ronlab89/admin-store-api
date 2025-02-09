import { Sale } from "../models/sale.model.js";

const saleList = async () => {
  try {
    const allSales = await Sale.find().lean(true);
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
  userId,
  products,
  customer,
  total_amount,
  payment_method,
  events_history
) => {
  try {
    const sale = new Sale({
      userId,
      products,
      customer,
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
  userId,
  products,
  customer,
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
          userId,
          products,
          customer,
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
