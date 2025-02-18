import { dataDashboard, dataProfile } from "../services/dashboard.service.js";

const dashboard = async (req, res) => {
  try {
    const { consultDate } = req.body;
    const result = await dataDashboard(consultDate);
    if (!result) throw new Error("No se pudo obtener los datos");
    return res.status(200).json({
      ok: true,
      message: "Se obtuvieron los datos de forma correcta",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const result = await dataProfile(employeeId);
    if (!result) throw new Error("No se pudo obtener los datos");
    return res.status(200).json({
      ok: true,
      message: "Se obtuvieron los datos de forma correcta",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export { dashboard, profile };
