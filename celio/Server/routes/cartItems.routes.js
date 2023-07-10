import { Router } from "express";
import {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
} from "../controllers/cartItems.controller.js";
import{authRequired } from "../utils/jwt.js";
const cartItemsRoutes = Router();

// Create cart item
cartItemsRoutes.post("/",authRequired, createCartItem);

// Get all cart items for a specific user
cartItemsRoutes.get("/:user_id",authRequired, getAllCartItems);

// Get cart item by ID
cartItemsRoutes.get("/item/:id",authRequired, getCartItemById);

// Update cart item
cartItemsRoutes.put("/:id",authRequired, updateCartItem);

// Delete cart item
cartItemsRoutes.delete("/:id", authRequired,deleteCartItem);

export { cartItemsRoutes };
