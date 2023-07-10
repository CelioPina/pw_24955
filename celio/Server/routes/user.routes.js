import Router from "express";
import {
  login,
  register,
  getUserProfile,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

//--ROUTES--//
const usersRoutes = Router();

// http://localhost:4242/api/user/login
usersRoutes.post("/login", login);

// http://localhost:4242/api/user/register
usersRoutes.post("/register", register);

// http://localhost:4242/api/user/:id
usersRoutes.get("/:id/profile", getUserProfile);

// http://localhost:4242/api/user/1/profile
usersRoutes.get("/:id/profile", getUserProfile);

// http://localhost:4242/api/user/
usersRoutes.get("/", getAllUsers);

// http://localhost:4242/api/user/:id
usersRoutes.put("/:id", updateUser);

// http://localhost:4242/api/user/:id
usersRoutes.delete("/:id", deleteUser);

export { usersRoutes };
