import { Customer } from "../models/customer.model.js";
import { Product } from "../models/product.model.js";
import { Purchase } from "../models/purchase.model.js";
import { Sale } from "../models/sale.model.js";
import { Supplier } from "../models/supplier.model.js";

const dataDashboard = async (consultDate) => {
  try {
    // Extraer el año y mes de consultDate
    const [year, month] = consultDate.split("-");
    const startDate = new Date(Number(year), Number(month) - 1, 1); // Primer día del mes
    const endDate = new Date(Number(year), Number(month), 0); // Último día del mes

    // Obtener todos los datos necesarios
    const purchases = await Purchase.find({
      "events_history.purchase_created_at": { $gte: startDate, $lte: endDate },
    }).lean();

    const sales = await Sale.find({
      "events_history.sale_created_at": { $gte: startDate, $lte: endDate },
    }).lean();

    const suppliers = await Supplier.find().lean();
    const customers = await Customer.find().lean();
    const products = await Product.find().lean();
    // Calcular métricas

    // 1. Ganancia total
    const totalSales = sales.reduce(
      (total, sale) => total + sale.total_amount,
      0
    );
    const totalPurchases = purchases.reduce(
      (total, purchase) => total + purchase.total_amount,
      0
    );
    const revenue = totalSales - totalPurchases;

    // 2. Proveedores con mayor cantidad de pedidos
    const supplierOrderCount = {};
    purchases.forEach((purchase) => {
      purchase.products.forEach((product) => {
        const supplierId = purchase.supplierId._id.toString();
        if (!supplierOrderCount[supplierId]) {
          supplierOrderCount[supplierId] = 0;
        }
        supplierOrderCount[supplierId] += product.quantity;
      });
    });

    const topSuppliers = Object.entries(supplierOrderCount)
      .map(([supplierId, count]) => ({
        supplier: suppliers.find((s) => s._id.toString() === supplierId),
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 proveedores

    // 3. Productos más vendidos por cantidad
    const productSalesCount = {};
    sales.forEach((sale) => {
      sale.products.forEach((product) => {
        const productId = product.productId.toString();
        if (!productSalesCount[productId]) {
          productSalesCount[productId] = 0;
        }
        productSalesCount[productId] += product.quantity;
      });
    });

    const topProductsByQuantity = Object.entries(productSalesCount)
      .map(([productId, quantity]) => ({
        product: products.find((p) => p._id.toString() === productId),
        quantity,
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5); // Top 5 productos

    // 4. Clientes con mayor cantidad de compras
    const customerPurchaseCount = {};
    sales.forEach((sale) => {
      const customerId = sale.customerId._id.toString();
      if (!customerPurchaseCount[customerId]) {
        customerPurchaseCount[customerId] = 0;
      }
      customerPurchaseCount[customerId]++;
    });

    const topCustomers = Object.entries(customerPurchaseCount)
      .map(([customerId, count]) => ({
        customer: customers.find((c) => c._id.toString() === customerId),
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 clientes

    // 5. Producto más vendido vs producto menos vendido por cantidad
    const sortedProductsByQuantity = Object.entries(productSalesCount)
      .map(([productId, quantity]) => ({
        product: products.find((p) => p._id.toString() === productId),
        quantity,
      }))
      .sort((a, b) => b.quantity - a.quantity);

    const mostSoldProduct = sortedProductsByQuantity[0];
    const leastSoldProduct =
      sortedProductsByQuantity[sortedProductsByQuantity.length - 1];

    // 6. Top productos más vendidos por monto total
    const productSalesAmount = {};
    sales.forEach((sale) => {
      sale.products.forEach((product) => {
        const productId = product.productId.toString();
        if (!productSalesAmount[productId]) {
          productSalesAmount[productId] = 0;
        }
        productSalesAmount[productId] += product.price * product.quantity;
      });
    });

    const topProductsByAmount = Object.entries(productSalesAmount)
      .map(([productId, amount]) => ({
        product: products.find((p) => p._id.toString() === productId),
        amount,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5); // Top 5 productos

    // Devolver los resultados al frontend
    return {
      totalSales,
      totalPurchases,
      revenue,
      topSuppliers,
      topProductsByQuantity,
      topCustomers,
      mostSoldProduct,
      leastSoldProduct,
      topProductsByAmount,
    };
  } catch (error) {
    // console.error(error);
    throw error; // Propagar el error para manejarlo en el controlador
  }
};

const dataProfile = async (employeeId) => {
  try {
    // Obtener la fecha actual
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // Mes actual (0-indexed)

    // Calcular el rango de fechas para el mes actual
    const startDate = new Date(currentYear, currentMonth, 1); // Primer día del mes
    const endDate = new Date(currentYear, currentMonth + 1, 0); // Último día del mes

    // Filtrar las ventas realizadas por el empleado en el mes actual
    const sales = await Sale.find({
      "events_history.user": employeeId,
      "events_history.sale_created_at": { $gte: startDate, $lte: endDate },
    }).lean();

    // Obtener todos los productos para mapear IDs a nombres
    const products = await Product.find().lean();
    // Calcular métricas

    // 1. Top productos que más ha vendido ese empleado
    const productSalesCount = {};
    sales.forEach((sale) => {
      sale.products.forEach((product) => {
        const productId = product.productId.toString();
        if (!productSalesCount[productId]) {
          productSalesCount[productId] = 0;
        }
        productSalesCount[productId] += product.quantity;
      });
    });

    const topProductsByQuantity = Object.entries(productSalesCount)
      .map(([productId, quantity]) => ({
        product: products.find((p) => p._id.toString() === productId),
        quantity,
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5); // Top 5 productos

    // 2. Producto más vendido vs producto menos vendido por ese empleado
    const sortedProductsByQuantity = Object.entries(productSalesCount)
      .map(([productId, quantity]) => ({
        product: products.find((p) => p._id.toString() === productId),
        quantity,
      }))
      .sort((a, b) => b.quantity - a.quantity);

    const mostSoldProduct = sortedProductsByQuantity[0];
    const leastSoldProduct =
      sortedProductsByQuantity[sortedProductsByQuantity.length - 1];

    // Devolver los resultados al frontend
    return {
      topProductsByQuantity,
      mostSoldProduct,
      leastSoldProduct,
    };
  } catch (error) {
    // console.error(error);
    throw error; // Propagar el error para manejarlo en el controlador
  }
};

export { dataDashboard, dataProfile };
