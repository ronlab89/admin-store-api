import { Product } from "../models/product.model.js";

const productList = async () => {
  try {
    const populateCategory = {
      path: "category",
      select: "name",
    };
    const populateSupplier = {
      path: "supplier",
      select: "name",
    };
    const populateUser = {
      path: "events_history.user",
      select: "name",
    };
    const allProducts = await Product.find()
      .populate(populateCategory)
      .populate(populateSupplier)
      .populate(populateUser)
      .lean(true);
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
    const populateCategory = {
      path: "category",
      select: "name",
    };
    const populateSupplier = {
      path: "supplier",
      select: "name",
    };
    const populateUser = {
      path: "events_history.user",
      select: "name",
    };
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
    const productUpdate = await Product.findById(product._id)
      .populate(populateCategory)
      .populate(populateSupplier)
      .populate(populateUser)
      .lean(true);
    return productUpdate;
  } catch (error) {
    console.log(error.message);
  }
};

const productUpdate = async (
  name,
  description,
  price,
  category,
  supplier,
  date,
  updating_user,
  id
) => {
  try {
    const populateCategory = {
      path: "category",
      select: "name",
    };
    const populateSupplier = {
      path: "supplier",
      select: "name",
    };
    const populateUser = {
      path: "events_history.user",
      select: "name",
    };
    const product = await Product.findById(id);
    if (!product) return product;
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          description,
          price,
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
    const productPopulated = await Product.findById(updateProduct._id)
      .populate(populateCategory)
      .populate(populateSupplier)
      .populate(populateUser)
      .lean(true);
    return productPopulated;
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
