import { User } from "../models/user.model.js";

export const UserRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.uid);
    const role = user.role;
    if (role === "empleado")
      throw new Error("No tienes permisos para hacer esta operacion");
    if (role === "administrador" || role === "supervisor") return next();
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
