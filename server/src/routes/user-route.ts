import { Router } from "express";
import { authMiddleware } from "../middleswares/authMiddleware";
import {
  getUser,
  getUsers,
  removeUser,
  updateUser,
} from "../controllers/user-controller";

const userRouter = Router();

userRouter.get("/", authMiddleware, getUsers);
userRouter.get("/:id", authMiddleware, getUser);
userRouter.get("/delete/:id", removeUser);
userRouter.put("/update/:id", authMiddleware, updateUser);

export default userRouter;
