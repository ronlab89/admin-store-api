import express from "express";
import {
  register,
  login,
  info,
  refresh,
  logout,
} from "../controllers/auth.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import {
  bodyLoginValidations,
  bodyRegisterValidations,
} from "../middlewares/validationsManager.js";

const router = express.Router();

router
  .post("/register", bodyRegisterValidations, requireToken, register)
  .post("/login", bodyLoginValidations, login)
  .get("/user", requireToken, info)
  .post("/refresh-token", requireRefreshToken, refresh)
  .post("/logout", logout);

export default router;
