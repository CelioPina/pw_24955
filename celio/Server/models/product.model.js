// Import the required modules
import { INTEGER, STRING } from "sequelize";
import { Vinil_DB } from "../config/context/database.js";

// Define the Products model
const ProductsModel = Vinil_DB.define("Products", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  artist: {
    type: STRING,
    allowNull: false,
  },
  genre: {
    type: STRING,
    allowNull: false,
  },
  year: {
    type: INTEGER,
    allowNull: false,
  },
  price: {
    type: INTEGER,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
  },
  stock: {
    type: INTEGER,
    allowNull: false,
  },
  quantity_sold: {
    type: INTEGER,
    allowNull: false,
  },
});

// Export the models
export { ProductsModel };
