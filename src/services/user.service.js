import { User } from "../models/user.model.js";

const populateUser = {
  path: "events_history.user",
  select: "name surname email role",
};
const populateUserEditing = {
  path: "events_history.user_edited_at.updating_user",
  select: "name surname email role",
};

const userList = async () => {
  try {
    const allUsers = await User.find()
      .select("-password")
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    return allUsers;
  } catch (error) {
    // console.log(error);
  }
};

const userById = async (id) => {
  try {
    const user = await User.findById(id)
      .select("-password")
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean(true);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    // console.log(error);
    throw new Error("Error al buscar el usuario por ID");
  }
};

const userUpdate = async (
  name,
  surname,
  email,
  phone,
  address,
  role,
  date,
  updating_user,
  id
) => {
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
          phone,
          address,
          role,
        },
        $push: {
          "events_history.user_edited_at": {
            date,
            updating_user,
          },
        },
      },
      { returnDocument: "after", new: true }
    );
    const userPopulated = await User.findById(updateUser._id)
      .select("-password")
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean();
    return userPopulated;
  } catch (error) {
    // console.log(error);
  }
};

const userRemove = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) return user;
    const removeUser = await User.findByIdAndDelete(id);
    return removeUser;
  } catch (error) {
    // console.log(error);
  }
};

export { userList, userById, userUpdate, userRemove };
