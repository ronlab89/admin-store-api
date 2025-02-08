import express from "express";
import {
  register,
  login,
  infoUser,
  refreshToken,
  logout,
} from "../../controllers/auth.controller.js";
import { requireToken } from "../../middlewares/requireToken.js";
import { requireRefreshToken } from "../../middlewares/requireRefreshToken.js";
import {
  bodyLoginValidations,
  bodyRegisterValidations,
} from "../../middlewares/validationsManager.js";

const router = express.Router();

router
  .post("/register", bodyRegisterValidations, register)
  .post("/login", bodyLoginValidations, login)
  .get("/user", requireToken, infoUser)
  .post("/refreshToken", requireRefreshToken, refreshToken)
  .post("/logout", logout);

export default router;
