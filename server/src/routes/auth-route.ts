import express, { RequestHandler, Request, Response } from "express";
import {
  login,
  logout,
  register,
  removeUser,
  updateUser,
} from "../controllers/auth-controller";

const router = express.Router();

// router.route("/register").post(register);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/delete", removeUser);
router.get("/update", updateUser);

export default router;
