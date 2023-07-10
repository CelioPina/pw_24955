import { ProductsModel } from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      artist,
      genre,
      year,
      price,
      description,
      imageUrl,
      stock,
      quantity_sold,
    } = req.body;
    const product = await ProductsModel.create({
      title,
      artist,
      genre,
      year,
      price,
      description,
      imageUrl,
      stock,
      quantity_sold,
    });
    return res.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Failed to create product" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductsModel.findAll();
    return res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(500).json({ message: "Failed to retrieve products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsModel.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    return res.status(500).json({ message: "Failed to retrieve product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      artist,
      genre,
      year,
      price,
      description,
      imageUrl,
      stock,
      quantity_sold,
    } = req.body;
    await ProductsModel.update(
      {
        title,
        artist,
        genre,
        year,
        price,
        description,
        imageUrl,
        stock,
        quantity_sold,
      },
      { where: { id } }
    );
    return res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductsModel.destroy({ where: { id } });
    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Failed to delete product" });
  }
};

export const updateProductStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const product = await ProductsModel.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the stock of the product
    product.stock = stock;
    await product.save();

    return res.json({ message: "Product stock updated successfully" });
  } catch (error) {
    console.error("Error updating product stock:", error);
    return res.status(500).json({ message: "Failed to update product stock" });
  }
};
