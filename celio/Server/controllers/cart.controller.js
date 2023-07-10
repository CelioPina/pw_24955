import { CartModel } from "../models/cart.model.js";
import { Cart_ItemsModel } from "../models/cartItems.model.js";

export const createCart = async (req, res) => {
  try {
    const { user_id } = req.body;
    const cart = await CartModel.create({ user_id });
    return res.json(cart);
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(500).json({ message: "Failed to create cart" });
  }
};

export const getAllCarts = async (req, res) => {
  try {
    const carts = await CartModel.findAll();
    return res.json(carts);
  } catch (error) {
    console.error("Error retrieving carts:", error);
    return res.status(500).json({ message: "Failed to retrieve carts" });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartModel.findByPk(id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.json(cart);
  } catch (error) {
    console.error("Error retrieving cart:", error);
    return res.status(500).json({ message: "Failed to retrieve cart" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    await CartModel.update({ user_id }, { where: { id } });
    return res.json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ message: "Failed to update cart" });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    await CartModel.destroy({ where: { id } });
    return res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error);
    return res.status(500).json({ message: "Failed to delete cart" });
  }
};

export const clearCartItems = async (req, res) => {
  try {
    const { id } = req.params;

    // Encontre o carrinho correspondente ao usuário
    const cart = await CartModel.findOne({
      where: { user_id: id },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remova todos os itens relacionados a esse carrinho
    await Cart_ItemsModel.destroy({ where: { cart_id: cart.id } });

    return res.json({ message: "Cart items cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart items:", error);
    return res.status(500).json({ message: "Failed to clear cart items" });
  }
};



