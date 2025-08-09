import { Request, Response } from "express";
import { IUser, User } from "../models/user.model";
import mongoose from "mongoose";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../lib/cloundinary";
import { Post } from "../models/posts.model";
import { UploadApiResponse } from "cloudinary";

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    //TODO: omiting passwords
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      status: 200,
      message: "Operation successful",
      data: users,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error occurred while fetching users",
      error,
    });
    return;
  }
};

// Get a user
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!mongoose.isValidObjectId(userId)) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid user id",
      });
      return;
    }

    const user = await User.findById(userId).select("-password");

    res.status(200).json({
      success: true,
      status: 200,
      message: "Operation successfull",
      data: user,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error occurred while fetching user",
    });
  }
};
// Update user
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { firstname, lastname }: Partial<IUser> = req.body;

  if (!firstname && !lastname) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "No updates provided",
    });
    return;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { firstname, lastname } },
      { new: true }
    ).select("firstname lastname gender email");
    if (!updatedUser) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "User not found to update",
      });
      return;
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error occurred while updating the user",
      error,
    });
    return;
  }
};

// Update user profile image

export const updateProfileImage = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.id;
  const file = req.file;

  try {
    if (
      !mongoose.isValidObjectId(userId) ||
      userId !== req.userId?.toString()
    ) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid user id",
      });
      return;
    }

    if (!file) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "No file uploaded",
      });
      return;
    }

    const userToUpdate = await User.findById(userId).select(
      "profileImage"
    );

    const cloudinaryDeleteResult = userToUpdate?.profileImage
      ?.publicId
      ? await deleteFileFromCloudinary(
          userToUpdate?.profileImage?.publicId!
        )
      : undefined;

    let cloundinaryUploadResult: UploadApiResponse | undefined;
    if (
      cloudinaryDeleteResult?.result === "ok" ||
      !userToUpdate?.profileImage?.publicId
    ) {
      cloundinaryUploadResult = await uploadFileToCloudinary(
        file.path
      );
    }
    if (!cloundinaryUploadResult) {
      res.status(500).json({
        success: false,
        status: 500,
        message: "Cloudinary upload failed",
      });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          profileImage: {
            secureUrl: cloundinaryUploadResult.secure_url,
            publicId: cloundinaryUploadResult.public_id,
          },
        },
      },
      {
        new: true,
      }
    ).select("-password");
    if (!updatedUser) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "User profile image updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
    });
    return;
  }
};

// Delete a user
export const removeUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    if (!mongoose.isValidObjectId(userId)) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid user ID",
      });
      return;
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "User deleted successfully",
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error occurred while deleting user",
      error,
    });
    return;
  }
};

// Get all the likes of all posts
export const getAllLikes = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid user ID",
      });
      return;
    }

    const posts = await Post.find({ author: userId }).select("likes");
    const totalLikes = posts.reduce(
      (acc, post) => acc + post?.likes.length,
      0
    );

    res.status(200).json({
      success: true,
      status: 200,
      data: totalLikes,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
};
