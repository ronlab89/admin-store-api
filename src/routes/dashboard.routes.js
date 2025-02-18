import express from "express";

import { requireToken } from "../middlewares/requireToken.js";
import { dashboard, profile } from "../controllers/dashboard.controller.js";

const router = express.Router();

router
  .post("/data-dashboard", requireToken, dashboard)
  .post("/data-profile", requireToken, profile);

export default router;
