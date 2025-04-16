import { Request, Response } from "express";
import { IUser, User } from "../models/user.model";
import mongoose from "mongoose";

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
    );
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
