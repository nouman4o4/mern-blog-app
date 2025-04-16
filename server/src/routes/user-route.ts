import { Router } from "express";
import { authMiddleware } from "../middleswares/authMiddleware";
import {
  getUsers,
  removeUser,
  updateUser,
} from "../controllers/user-controller";

const userRouter = Router();

userRouter.get("/", authMiddleware, getUsers);
userRouter.get("/delete/:id", removeUser);
userRouter.put("/update/:id", authMiddleware, updateUser);

export default userRouter;
