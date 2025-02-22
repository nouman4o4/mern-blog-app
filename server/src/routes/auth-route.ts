import express, { RequestHandler, Request, Response } from "express";
import {
  getUsers,
  login,
  logout,
  register,
  removeUser,
  updateUser,
} from "../controllers/auth-controller";
import { authMiddleware } from "../middleswares/authMiddleware";

const router = express.Router();

// typescript error occurring becuase of returning the response;

router.get("/", authMiddleware, getUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);
router.get("/delete", removeUser);
router.put("/update", authMiddleware, updateUser);

export default router;
