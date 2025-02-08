import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import v1AuthRouter from "./routes/auth.routes.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ ok: true, server: "running" });
});

app.use(
  cors({
    credentials: true,
    origin: [
      process.env.ORIGIN,
      process.env.ORIGIN1,
      process.env.ORIGIN2,
      process.env.ORIGIN3,
    ],
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/auth", v1AuthRouter);

const PORT = process.env.PORT || 7000;
app.listen(
  PORT,
  console.log("🚀 Server listen on port http://localhost:" + PORT)
);
