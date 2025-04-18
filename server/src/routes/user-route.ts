import { Router } from "express";
import { authMiddleware } from "../middleswares/authMiddleware";
import {
  getUser,
  getUsers,
  removeUser,
  updateProfileImage,
  updateUser,
} from "../controllers/user-controller";
import { upload } from "../middleswares/multer";

const userRouter = Router();

userRouter.get("/", authMiddleware, getUsers);
userRouter.get("/:id", authMiddleware, getUser);
userRouter.get("/delete/:id", removeUser);
userRouter.put("/update/:id", authMiddleware, updateUser);
userRouter.put(
  "/updateProfile/:id",
  upload.single("profile"),
  authMiddleware,
  updateProfileImage
);

export default userRouter;
