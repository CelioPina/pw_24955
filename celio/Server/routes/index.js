import { Router } from "express";
import { usersRoutes } from "./user.routes.js";
import { cartRoutes } from "./cart.routes.js";
import { cartItemsRoutes } from "./cartItems.routes.js";

import { productRoutes } from "./product.routes.js";

const api = Router();

// Mount user routes
api.use("/user", usersRoutes);

// Mount cart routes
api.use("/cart", cartRoutes);

// Mount cart items routes
api.use("/cart-items", cartItemsRoutes);

// Mount product routes
api.use("/products", productRoutes);

export { api };
