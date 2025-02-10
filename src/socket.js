// src/socket.js
import { Product } from "./models/product.model.js";

export default function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    const populateCategory = {
      path: "category",
      select: "name",
    };
    const populateSupplier = {
      path: "supplier",
      select: "name",
    };
    const populateUser = {
      path: "events_history.user",
      select: "name",
    };

    // Emitir productos actuales al cliente cuando se conecta
    socket.on("fetchProducts", async () => {
      const products = await Product.find()
        .populate(populateCategory)
        .populate(populateSupplier)
        .populate(populateUser);
      socket.emit("initialProducts", products);
    });

    // Escuchar actualizaciones de stock desde el cliente
    socket.on("updateStock", async ({ productId, quantity }) => {
      try {
        const product = await Product.findById(productId);
        if (!product) return;

        product.stock += quantity;
        await product.save();

        // Emitir productos actualizados a todos los clientes
        const updatedProducts = await Product.find();
        io.emit("stockUpdated", updatedProducts);
      } catch (error) {
        console.error("Error al actualizar el stock:", error);
      }
    });

    // Manejar desconexión
    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
}
