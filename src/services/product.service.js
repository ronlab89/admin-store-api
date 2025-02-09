import { Product } from "../models/product.model.js";

const productList = async () => {
  try {
    const allProducts = await Product.find().lean(true);
    return allProducts;
  } catch (error) {
    console.log(error);
  }
};

const productById = async (id) => {
  try {
    const product = await Product.findById(id).lean(true);
    if (!product) {
      return null;
    }
    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar el producto por ID");
  }
};

const productCreate = async (
  name,
  description,
  price,
  stock,
  category,
  supplier,
  events_history
) => {
  try {
    let product = await Product.findOne({ name });
    if (product !== null) return "Exists";
    product = new Product({
      name,
      description,
      price,
      stock,
      category,
      supplier,
      events_history,
    });
    await product.save();
    return product;
  } catch (error) {
    console.log(error.message);
  }
};

const productUpdate = async (
  name,
  description,
  price,
  stock,
  category,
  supplier,
  date,
  updating_user,
  id
) => {
  try {
    const product = await Product.findById(id);
    if (!product) return product;
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          description,
          price,
          stock,
          category,
          supplier,
        },
        $push: {
          "events_history.product_updated_at": {
            date,
            updating_user,
          },
        },
      },
      { returnDocument: "after", new: true }
    );
    return updateProduct;
  } catch (error) {
    console.log(error);
  }
};

const productRemove = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) return product;
    const removeProduct = await Product.findByIdAndDelete(id);
    return removeProduct;
  } catch (error) {
    console.log(error);
  }
};

export {
  productList,
  productById,
  productCreate,
  productUpdate,
  productRemove,
};
