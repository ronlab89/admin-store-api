import { User } from "../models/user.model.js";
import { refreshTokenGenerate, tokenGenerate } from "../utils/tokenManager.js";

const populateUser = {
  path: "events_history.user",
  select: "name surname email role",
};
const populateUserEditing = {
  path: "events_history.user_edited_at.updating_user",
  select: "name surname email role",
};

const registerUser = async (
  name,
  surname,
  email,
  phone,
  address,
  password,
  role,
  events_history
) => {
  try {
    let user = await User.findOne({ email });
    if (user !== null) return "Exists";
    user = new User({
      name,
      surname,
      email,
      phone,
      address,
      password,
      role,
      events_history,
    });
    await user.save();
    const userWithoutPassword = await User.findById(user._id)
      .select("-password")
      .select("-__v")
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean();
    return userWithoutPassword;
  } catch (error) {
    // console.log(error.message);
  }
};

const loginUser = async (email, password, res) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return "notUser";
    const resPassword = await user.comparePassword(password);
    if (!resPassword) return "notPassword";
    const { token, expiresIn } = tokenGenerate(user._id);
    refreshTokenGenerate(user._id, res);
    return { email: user.email, token, expiresIn };
  } catch (error) {
    // console.log(error.message);
  }
};

const infoUser = async (req) => {
  try {
    const user = await User.findById(req.uid)
      .select("-password")
      .select("-__v")
      .populate(populateUser)
      .populate(populateUserEditing)
      .lean();
    return user;
  } catch (error) {
    // console.log(error);
  }
};

const refreshToken = (req) => {
  try {
    const { token, expiresIn } = tokenGenerate(req.uid);
    return { token, expiresIn };
  } catch (error) {
    // console.log(error);
  }
};

const logoutUser = (res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("refreshToken", {
    domain: isProduction ? process.env.ORIGIN : "localhost",
    path: "/",
    httpOnly: true,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
  });

  res.json({ ok: true, message: "Sesión cerrada" });
};

export { registerUser, loginUser, infoUser, refreshToken, logoutUser };
