import express, { Request, Response, response } from "express";
import { User, IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password }: Partial<IUser> =
    req.body;

  console.log("api hits");
  if (
    [firstname, lastname, email, password].some(
      (elem) => elem?.trim() === ""
    )
  ) {
    return res
      .status(400)
      .json({ message: "Please fill in all fields" });
  }
  // find existting user in the db
  try {
    const existtingUser = await User.findOne({ email });
    if (existtingUser) {
      return res.status(404).json("Email is in already in use");
    }

    // create  a new user
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
    });
    if (!newUser) {
      throw Error;
    }
    return res.status(201).json({
      message: "User created successfully",
      user: {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "unexpected error occured: ", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: Partial<IUser> = req.body;
  console.log("api hits");
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill in all fields" });
  }

  try {
    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRETE_KEY as string,
      { expiresIn: "15d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 10000,
      secure: process.env.NODE_ENY !== "development",
      sameSite: "strict",
    });
    return res.status(200).json({
      message: "Logged in successfully",
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "unexpected error occured: ", error });
  }
};

// log out

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });
    return res
      .status(200)
      .json({ message: "user loged out successfully!" });
  } catch (error) {
    return res.status(400).json({
      message: "unexpected error occured while loging out",
      error,
    });
  }
};

// updating a user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstname, lastname }: Partial<IUser> = req.body;
  if (!firstname || !lastname) {
    return res.status(400).json({ message: "No updates provided" });
  }
  try {
    const updateFields: Partial<IUser> = {};

    if (firstname) updateFields.firstname = firstname;
    if (lastname) updateFields.lastname = lastname;

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: updateFields },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found to udpate" });
    }
    return res.status(200).json({
      message: "User updated succesffully",
      user: {
        id: updatedUser._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "an unexpected error uccured while udpating the user",
      error,
    });
  }
};
export const removeUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  // check if the userId is available and correct
  try {
    if (!userId || mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "invalid user id" });
    }
    const deletedUser = User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(400).json({ message: "user not found" });
    }

    return res
      .status(204)
      .json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(400).json({
      message: "Unexpected error occurred while deleting user",
      error,
    });
  }
};
