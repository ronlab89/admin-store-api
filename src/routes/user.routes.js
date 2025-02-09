import express from "express";

import { requireToken } from "../middlewares/requireToken.js";
import { UserRole } from "../middlewares/requireRoleAdm.js";
import { list, remove, update, user } from "../controllers/user.controller.js";

const router = express.Router();

router
  .get("/list", requireToken, UserRole, list)
  .get("/:id", requireToken, UserRole, user)
  .put("/:id", requireToken, UserRole, update)
  .delete("/:id", requireToken, UserRole, remove);

export default router;
