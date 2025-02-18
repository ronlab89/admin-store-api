import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireRefreshToken = (req, res, next) => {
  try {
    let tokenRefreshCookie = req.cookies?.refreshToken;
    if (!tokenRefreshCookie) throw new Error("No existe el token");
    const { uid } = jwt.verify(tokenRefreshCookie, process.env.JWT_REFRESH);
    req.uid = uid;
    next();
  } catch (error) {
    // console.log(error);
    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
};
