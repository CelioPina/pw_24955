import { UserModel } from "../models/user.model.js";
import { createToken } from "../utils/jwt.js";
import { CartModel } from "../models/cart.model.js";
import { Cart_ItemsModel } from "../models/cartItems.model.js";

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete user's cart and cart items
    await deleteUserCart(id);

    // Delete the user
    await UserModel.destroy({ where: { id } });

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Failed to delete user" });
  }
};

const deleteUserCart = async (userId) => {
  try {
    // Find user's cart
    const cart = await CartModel.findOne({ where: { user_id: userId } });

    if (cart) {
      const cartId = cart.id;

      // Delete cart items
      await Cart_ItemsModel.destroy({ where: { cart_id: cartId } });

      // Delete the cart
      await CartModel.destroy({ where: { id: cartId } });
    }
  } catch (error) {
    console.error("Error deleting user's cart:", error);
    throw new Error("Failed to delete user's cart");
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    where: {
      email: email,
      password: password,
    },
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    return res.status(401).json({ message: "User nao existe" });
  }
  const token = createToken({
    id: user.id,
    email: user.email,
    batatas: 2,
  });

  return res.json({
    user,
    token,
  });
};




export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await UserModel.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const user = await UserModel.create({ name, email, password, role });

    return res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"] }, 
    });

    return res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({ message: "Failed to retrieve users" });
  }
};




export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    await UserModel.update({ name, email, password }, { where: { id } });
    return res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Failed to update user" });
  }
};



export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ message: "Failed to retrieve user" });
  }
};
