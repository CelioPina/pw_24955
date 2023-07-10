import { INTEGER } from "sequelize";
import { Vinil_DB } from "../config/context/database.js";
import { CartModel } from "./cart.model.js";
import { ProductsModel } from "./product.model.js";

// Define the Cart_Items model
const Cart_ItemsModel = Vinil_DB.define("Cart_Items", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cart_id: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: CartModel,
      key: "id",
    },
  },
  product_id: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: ProductsModel,
      key: "id",
    },
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
  },
});

export { Cart_ItemsModel };
