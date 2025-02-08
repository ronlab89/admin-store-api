import jwt from "jsonwebtoken";

export const tokenGenerate = (uid) => {
  const expiresIn = 60 * 60 * 24;
  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const refreshTokenGenerate = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30; // 30 días en segundos
  const isProduction = process.env.NODE_ENV === "production"; // Detecta si estás en producción

  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction,
      domain: isProduction ? process.env.ORIGIN : "localhost",
      expires: new Date(Date.now() + expiresIn * 1000),
      // path: "/",
    });

    // res.json({ ok: true, message: "Refresh token generado" });
  } catch (error) {
    console.error("Error al generar el refresh token:", error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};

export const tokenVerificationErrors = {
  "invalid signature": "La firma del JWT no es válida",
  "jwt expired": "JWT expirado",
  "invalid token": "Token no valido",
  "No Bearer": "Utiliza formato Bearer",
  "jwt malformed": "JWT formato no valido",
};
