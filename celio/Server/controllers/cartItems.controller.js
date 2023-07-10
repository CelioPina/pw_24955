import { Cart_ItemsModel } from "../models/cartItems.model.js";
import { CartModel } from "../models/cart.model.js";
import { UserModel } from "../models/user.model.js";
export const createCartItem = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    // Procurar o carrinho correspondente ao usuário
    let cart = await CartModel.findOne({
      where: { user_id },
    });

    if (!cart) {
      // Criar um novo carrinho para o usuário
      cart = await CartModel.create({ user_id });
    }

    const cartItem = await Cart_ItemsModel.create({
      cart_id: cart.id,
      product_id,
      quantity,
    });

    return res.json(cartItem);
  } catch (error) {
    console.error("Error creating cart item:", error);
    return res.status(500).json({ message: "Failed to create cart item" });
  }
};

export const getAllCartItems = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find the user corresponding to the user_id
    const user = await UserModel.findOne({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the cart corresponding to the user
    let cart = await CartModel.findOne({
      where: { user_id },
    });

    if (!cart) {
      // Create a new cart for the user
      cart = await CartModel.create({ user_id });
    }

    // Get all the items in the user's cart
    const cartItems = await Cart_ItemsModel.findAll({
      where: { cart_id: cart.dataValues.id },
    });

    return res.json(cartItems);
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    return res.status(500).json({ message: "Failed to retrieve cart items" });
  }
};

export const getCartItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await Cart_ItemsModel.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    return res.json(cartItem);
  } catch (error) {
    console.error("Error retrieving cart item:", error);
    return res.status(500).json({ message: "Failed to retrieve cart item" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { cart_id, product_id, quantity } = req.body;
    await Cart_ItemsModel.update(
      { cart_id, product_id, quantity },
      { where: { id } }
    );
    return res.json({ message: "Cart item updated successfully" });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({ message: "Failed to update cart item" });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart_ItemsModel.destroy({ where: { id } });
    return res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({ message: "Failed to delete cart item" });
  }
};
