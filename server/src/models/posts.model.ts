import mongoose, { Schema, Document, Types } from "mongoose";
export interface IPost extends Document {
  title: string;
  content: string;
  category: string;
  featuredImage?: string;
  author: Types.ObjectId;
  attachments?: string[];
  likes: Types.ObjectId[];
  comments: {
    user: Types.ObjectId;
    text: string;
    likes: Types.ObjectId[];
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  attachments: [{ type: String }],
  likes: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

export const Post = mongoose.model<IPost>("Post", PostSchema);
