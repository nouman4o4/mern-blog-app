import express, { Request, Response } from "express";
import { User, IUser } from "../models/user.model";
import { error } from "console";

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password }: Partial<IUser> =
    req.body;

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
      throw error;
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
