import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment extends Types.Subdocument {
  user: Types.ObjectId;
  text: string;
  likes?: Types.ObjectId[];
  createdAt?: Date;
  _id: string;
}

export interface IPost extends Document {
  title: string;
  content: string;
  category: string;
  featuredImage?: {
    secureUrl: string;
    publicId: string;
  };
  author: Types.ObjectId;
  attachments?: string[];
  likes: Types.ObjectId[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    _id: true,
    timestamps: true,
  }
);

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    featuredImage: {
      secureUrl: {
        type: String,
      },
      publicId: {
        type: String,
      },
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [commentSchema],
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", PostSchema);
