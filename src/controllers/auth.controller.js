import {
  registerUser,
  loginUser,
  infoUser,
  refreshToken,
  logoutUser,
} from "../services/auth.service.js";

const register = async (req, res) => {
  const { name, surname, email, password, role, events_history } = req.body;
  try {
    const createdUser = await registerUser(
      name,
      surname,
      email,
      password,
      role,
      events_history
    );
    if (createdUser === "Exists")
      throw new Error("Ya existe este email asociado a un usuario registrado.");
    return res
      .status(201)
      .json({
        ok: true,
        message: "El usuario ha sido creado.",
        data: createdUser,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log('Llega: ', email, password)
  try {
    const logged = await loginUser(email, password, res);
    if (logged === "notUser")
      return res.status(403).json({
        param: "email",
        error: "No existe este email asociado a ningun usuario registrado.",
      });
    if (logged === "notPassword")
      return res
        .status(403)
        .json({ param: "password", error: "La contraseña es incorrecta." });
    return res.json(logged);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const info = async (req, res) => {
  try {
    const userLogged = await infoUser(req);
    return res.status(200).json({ userLogged });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const refresh = async (req, res) => {
  try {
    const refresh = await refreshToken(req);
    return res.status(200).json({ refresh });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.mesage });
  }
};

const logout = async (req, res) => {
  await logoutUser(res);
};

export { register, login, info, refresh, logout };
