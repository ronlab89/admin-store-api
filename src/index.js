import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "node:http";
import setupSocket from "./socket.js";

import v1AuthRouter from "./routes/auth.routes.js";
import v1UserRouter from "./routes/user.routes.js";
import v1ProductRouter from "./routes/product.routes.js";
import v1SupplierRouter from "./routes/supplier.routes.js";
import v1SaleRouter from "./routes/sale.routes.js";
import v1PurchaseRouter from "./routes/purchase.routes.js";
import v1ExpenseRouter from "./routes/expense.routes.js";
import v1CustomerRouter from "./routes/customer.routes.js";
import v1ProductCategoryRouter from "./routes/productCategory.routes.js";
import v1PaymentMethodRouter from "./routes/paymentMethod.routes.js";
import v1ExpenseCategoryRouter from "./routes/expenseCategory.routes.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      process.env.ORIGIN,
      process.env.ORIGIN1,
      process.env.ORIGIN2,
      process.env.ORIGIN3,
    ],
    methods: ["GET", "POST"],
  },
});

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
app.use("/api/v1/user", v1UserRouter);
app.use("/api/v1/products", v1ProductRouter);
app.use("/api/v1/suppliers", v1SupplierRouter);
app.use("/api/v1/sales", v1SaleRouter);
app.use("/api/v1/purchases", v1PurchaseRouter);
app.use("/api/v1/expenses", v1ExpenseRouter);
app.use("/api/v1/customers", v1CustomerRouter);
app.use("/api/v1/product-category", v1ProductCategoryRouter);
app.use("/api/v1/payment-method", v1PaymentMethodRouter);
app.use("/api/v1/expense-category", v1ExpenseCategoryRouter);

setupSocket(io);

const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
  console.log("🚀 Server listen on port http://localhost:" + PORT);
});
