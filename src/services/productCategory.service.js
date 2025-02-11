import { ProductCategory } from "../models/productCategory.model.js";

const productCategoryList = async () => {
  try {
    const populateUser = {
      path: "events_history.user",
      select: "name surname email role",
    };
    const populateUserEditing = {
      path: "events_history.productCategory_updated_at.updating_user",
      select: "name surname email role",
    };

    const allProductCategorys = await ProductCategory.find()
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    return allProductCategorys;
  } catch (error) {
    console.log(error);
  }
};

const productCategoryById = async (id) => {
  try {
    const productCategory = await ProductCategory.findById(id).lean(true);
    if (!productCategory) {
      return null;
    }
    return productCategory;
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar la categoria de producto por ID");
  }
};

const productCategoryCreate = async (name, description, events_history) => {
  try {
    let productCategory = await ProductCategory.findOne({ name });
    if (productCategory !== null) return "Exists";
    productCategory = new ProductCategory({
      name,
      description,
      events_history,
    });
    await productCategory.save();
    return productCategory;
  } catch (error) {
    console.log(error.message);
  }
};

const productCategoryUpdate = async (
  name,
  description,
  date,
  updating_user,
  id
) => {
  try {
    const productCategory = await ProductCategory.findById(id);
    if (!productCategory) return productCategory;
    const updateProductCategory = await ProductCategory.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          description,
        },
        $push: {
          "events_history.productCategory_updated_at": {
            date,
            updating_user,
          },
        },
      },
      { returnDocument: "after", new: true }
    );
    return updateProductCategory;
  } catch (error) {
    console.log(error);
  }
};

const productCategoryRemove = async (id) => {
  try {
    const productCategory = await ProductCategory.findById(id);
    if (!productCategory) return productCategory;
    const removeProductCategory = await ProductCategory.findByIdAndDelete(id);
    return removeProductCategory;
  } catch (error) {
    console.log(error);
  }
};

export {
  productCategoryList,
  productCategoryById,
  productCategoryCreate,
  productCategoryUpdate,
  productCategoryRemove,
};
