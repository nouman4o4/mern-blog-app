import express, { RequestHandler, Request, Response } from "express";
import {
  login,
  logout,
  register,
} from "../controllers/auth-controller";
import { authMiddleware } from "../middleswares/authMiddleware";

const authRouter = express.Router();

// typescript error occurring becuase of returning the response;

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout/:id", authMiddleware, logout);

export default authRouter;
