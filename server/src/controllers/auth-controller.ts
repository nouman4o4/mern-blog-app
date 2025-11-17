import express, { Request, Response } from "express"
import { User, IUser } from "../models/user.model"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

// Register
export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password, gender }: Partial<IUser> =
    req.body
  const confirmPassword = req.body.confirmPassword

  if (
    [firstname, lastname, email, password, confirmPassword, gender].some(
      (elem) => !elem?.trim()
    )
  ) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Please fill in all fields",
    })
    return
  }
  if (password !== confirmPassword) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Passwords do not match",
    })
    return
  }

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(409).json({
        success: false,
        status: 409,
        message: "Email is already in use",
      })
      return
    }

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      gender,
    })
    if (!newUser) throw new Error("User creation failed")

    res.status(201).json({
      success: true,
      status: 201,
      message: "User created successfully",
      data: {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        _id: newUser._id,
      },
    })
    return
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error occurred",
      error,
    })
    return
  }
}

// login
export const login = async (req: Request, res: Response) => {
  const { email, password }: Partial<IUser> = req.body
  if (!email || !password) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Please fill in all fields",
    })
    return
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      })
      return
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      res.status(401).json({
        success: false,
        status: 401,
        message: "Invalid password",
      })
      return
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY as string,
      { expiresIn: "15d" }
    )
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "none",
    })
    res.status(200).json({
      success: true,
      status: 200,
      message: "Logged in successfully",
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        gender: user.gender,
        profileImage: user.profileImage,
        _id: user._id,
      },
    })
    return
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error occurred",
      error,
    })
    return
  }
}

// logout
export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("token", "", { maxAge: 0 })
    res.status(200).json({
      success: true,
      status: 200,
      message: "User logged out successfully",
    })
    return
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error occurred while logging out",
      error,
    })
    return
  }
}

// verify auth

export const verifyAuth = async (req: Request, res: Response) => {
  try {
    const userId = req.userId
    const requestedUserId = req.params.id

    if (
      !mongoose.isValidObjectId(requestedUserId) ||
      userId?.toString() !== requestedUserId.toString()
    ) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Incorrect user id",
      })
      return
    }

    const authUser = await User.findById(requestedUserId).select("-password")
    if (!authUser) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      })
      return
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "User is verified",
    })
    return
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong while verifying the user",
      error: error.stack,
    })
    return
  }
}
