import express, { Request, Response } from "express";
import { User, IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Register
export const register = async (req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    email,
    password,
    gender,
  }: Partial<IUser> = req.body;
  const confirmPassword = req.body.confirmPassword;

  if (
    [
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      gender,
    ].some((elem) => !elem?.trim())
  ) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Please fill in all fields",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Passwords do not match",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "Email is already in use",
      });
    }

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      gender,
    });
    if (!newUser) throw new Error("User creation failed");

    return res.status(201).json({
      success: true,
      status: 201,
      message: "User created successfully",
      data: {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        _id: newUser._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error occurred",
      error,
    });
  }
};

// login
export const login = async (req: Request, res: Response) => {
  const { email, password }: Partial<IUser> = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Please fill in all fields",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY as string,
      { expiresIn: "15d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Logged in successfully",
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error occurred",
      error,
    });
  }
};

// logout
export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error occurred while logging out",
      error,
    });
  }
};
