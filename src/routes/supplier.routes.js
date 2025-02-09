import express from "express";

import { requireToken } from "../middlewares/requireToken.js";
import { UserRole } from "../middlewares/requireRoleAdm.js";
import {
  list,
  supplier,
  create,
  update,
  remove,
} from "../controllers/supplier.controller.js";

const router = express.Router();

router
  .get("/list", requireToken, list)
  .get("/:id", requireToken, supplier)
  .post("/create", requireToken, create)
  .put("/:id", requireToken, UserRole, update)
  .delete("/:id", requireToken, UserRole, remove);

export default router;
