import { Router } from "express";
import { authMiddleware } from "../middleswares/authMiddleware";
import {
  getAllLikes,
  getUser,
  getUsers,
  removeUser,
  updateProfileImage,
  updateUser,
} from "../controllers/user-controller";
import { upload } from "../middleswares/multer";

const userRouter = Router();

// Get all users
userRouter.get("/", authMiddleware, getUsers);
// Get a user
userRouter.get("/:id", authMiddleware, getUser);
// Delete a user
userRouter.get("/delete/:id", removeUser);
// Update a user
userRouter.put("/update/:id", authMiddleware, updateUser);
// Update profile image
userRouter.put(
  "/update-profile/:id",
  upload.single("profile"),
  authMiddleware,
  updateProfileImage
);
// Get all the likes of a user
userRouter.get("/:userId/total-likes", getAllLikes);

export default userRouter;
