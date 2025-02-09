import { User } from "../models/user.model.js";

const userList = async () => {
  try {
    const allUsers = await User.find().select("-password").lean(true);
    return allUsers;
  } catch (error) {
    console.log(error);
  }
};

const userById = async (id) => {
  try {
    const user = await User.findById(id).select("-password").lean(true);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar el usuario por ID");
  }
};

const userUpdate = async (name, surname, email, role, id) => {
  try {
    const user = await User.findById(id);
    if (!user) return user;
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          surname,
          email,
          role,
        },
      },
      { returnDocument: "after", new: true }
    );
    return updateUser;
  } catch (error) {
    console.log(error);
  }
};

const userRemove = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) return user;
    const removeUser = await User.findByIdAndDelete(id);
    return removeUser;
  } catch (error) {
    console.log(error);
  }
};

export { userList, userById, userUpdate, userRemove };
