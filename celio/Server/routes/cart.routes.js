import { Router } from "express";
import {
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart,
  clearCartItems,
} from "../controllers/cart.controller.js";

const cartRoutes = Router();

// Create a new cart
cartRoutes.post("/", createCart);

// Get all carts
cartRoutes.get("/", getAllCarts);

// Get a cart by ID
cartRoutes.get("/:id", getCartById);

// Update a cart
cartRoutes.put("/:id", updateCart);

// Delete a cart
cartRoutes.delete("/:id", deleteCart);

// Rota para eliminar todos os itens de um carrinho
cartRoutes.delete("/:id/items", clearCartItems);

export { cartRoutes };