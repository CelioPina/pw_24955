import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductStock,
} from "../controllers/products.controller.js";

const productRoutes = Router();

// Create product
productRoutes.post("/", createProduct);

// Get all products
productRoutes.get("/", getAllProducts);

// Get product by ID
productRoutes.get("/:id", getProductById);

// Update product
productRoutes.put("/:id", updateProduct);

// Delete product
productRoutes.delete("/:id", deleteProduct);

// Update product stock
productRoutes.put("/:id/stock", updateProductStock);

export { productRoutes };
