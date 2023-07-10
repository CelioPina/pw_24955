import { INTEGER, DATE } from "sequelize";
import { Vinil_DB } from "../config/context/database.js";
import { UserModel } from "./user.model.js";

// Define the Cart model


const CartModel = Vinil_DB.define("Cart", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
});

export { CartModel };
