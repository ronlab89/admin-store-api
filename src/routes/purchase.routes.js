import express from "express";

import { requireToken } from "../middlewares/requireToken.js";
import { UserRole } from "../middlewares/requireRoleAdm.js";
import {
  list,
  purchase,
  create,
  update,
  remove,
} from "../controllers/purchase.controller.js";

const router = express.Router();

router
  .get("/list", requireToken, list)
  .get("/:id", requireToken, purchase)
  .post("/create", requireToken, create)
  .put("/:id", requireToken, UserRole, update)
  .delete("/:id", requireToken, UserRole, remove);

export default router;
