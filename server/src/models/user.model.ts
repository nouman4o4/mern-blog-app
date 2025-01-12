import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  posts?: Types.ObjectId;
}

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: [{ type: Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error: any) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>("User", userSchema);

export { User, IUser };
