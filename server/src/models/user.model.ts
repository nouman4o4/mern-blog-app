import { Schema, Types } from "mongoose";

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  posts: Types.ObjectId;
}

const userSchema = new Schema({}, { timestamps: true });
