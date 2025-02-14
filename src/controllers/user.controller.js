import {
  userList,
  userById,
  userUpdate,
  userRemove,
} from "../services/user.service.js";

const list = async (req, res) => {
  try {
    const allUsers = await userList();
    return res.status(200).json({ allUsers });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const user = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error de servidor", message: error.message });
  }
};

const update = async (req, res) => {
  const {
    name,
    surname,
    email,
    phone,
    address,
    role,
    events_history: {
      user_edited_at: { date, updating_user },
    },
  } = req.body;
  const { id } = req.params;
  try {
    const updated = await userUpdate(
      name,
      surname,
      email,
      phone,
      address,
      role,
      date,
      updating_user,
      id
    );
    if (!updated)
      throw new Error(
        "El usuario que intenta actualizar no fue encontrado en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "El usuario se ha actualizado correctamente",
      updated,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await userRemove(id);
    if (!deleted)
      throw new Error(
        "El usuario que desea eliminar no se encontro en la base de datos"
      );
    return res.status(200).json({
      ok: true,
      message: "El usuario se ha eliminado correctamente",
      deleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export { list, user, update, remove };
