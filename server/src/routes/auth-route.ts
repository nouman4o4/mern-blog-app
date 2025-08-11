import express, { RequestHandler, Request, Response } from "express";
import {
  login,
  logout,
  register,
  verifyAuth,
} from "../controllers/auth-controller";
import { authMiddleware } from "../middleswares/authMiddleware";

const authRouter = express.Router();

// typescript error occurring becuase of returning the response;

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout/:id", logout);
authRouter.get("/verify/:id", authMiddleware, verifyAuth);

export default authRouter;
