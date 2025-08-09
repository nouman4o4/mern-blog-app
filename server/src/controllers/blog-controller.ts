import { Request, response, Response } from "express";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../lib/cloundinary";
import { IComment, Post } from "../models/posts.model";
import { createBlogShcema } from "../schemas/blog-schema";
import fs from "fs";
import mongoose from "mongoose";

// Create blog post
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, author, category } = req.body;

    const zodResult = createBlogShcema.safeParse({
      title,
      content,
      author,
      category,
    });

    if (!zodResult.success) {
      res.status(400).json({
        success: false,
        status: 400,
        message:
          "Please provide all the required fields: title, content, author, and category.",
        error: zodResult.error.errors,
      });
      return;
    }

    const featuredImageFile = req.file;
    let uploadedImageData: { secureUrl: string; publicId: string } = {
      secureUrl: "",
      publicId: "",
    };

    if (featuredImageFile) {
      try {
        const imageUploadResult = await uploadFileToCloudinary(
          featuredImageFile.path
        );
        if (imageUploadResult) {
          uploadedImageData.secureUrl = imageUploadResult.secure_url;
          uploadedImageData.publicId = imageUploadResult.public_id;

          fs.unlink(featuredImageFile.path, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          status: 500,
          message: "Image upload failed",
          error,
        });
        return;
      }
    }

    const newPost = await Post.create({
      title,
      content,
      author,
      category,
      featuredImage: uploadedImageData,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "New blog post created successfully!",
      post: newPost,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Something went wrong while creating a new blog post",
      error: error.message || error,
    });
  }
};

// Get all blog posts
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const allBlogPosts = await Post.find(
      category && typeof category === "string"
        ? {
            category:
              category.charAt(0).toUpperCase() + category.slice(1),
          }
        : {}
    ).sort({ createdAt: -1 });
    if (!allBlogPosts) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "No blog posts found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "All blog posts retrieved successfully",
      posts: allBlogPosts,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to retrieved blog posts",
      error: error.message || error,
    });
  }
};

// Get all blog posts of single user
export const getAllBlogsForUser = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.userid;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid user ID",
      });
      return;
    }
    const blogs = await Post.find({ author: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Data retrieved successfully",
      data: blogs,
    });
    return;
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

// Get a blog post
export const getBlog = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const isValidPostId = mongoose.isValidObjectId(postId);
    if (!isValidPostId) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid post ID",
      });
      return;
    }

    const blogPost = await Post.findOne({ _id: postId });

    if (!blogPost) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Blog post not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Blog post retrieved successfully",
      post: blogPost,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to retrieved blog post",
      error: error.message || error,
    });
  }
};

// Update a blog post
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const { title, content, category } = req.body;
    if (
      !title ||
      title.length < 5 ||
      !content ||
      content.length < 8
    ) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid request body",
      });
    }
    const isValidPostId = mongoose.isValidObjectId(postId);
    if (!isValidPostId) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid post ID",
      });
      return;
    }
    const postToUpdate = await Post.findById(postId).select(
      "featuredImage"
    );
    const featuredImageFile = req.file;
    let uploadedImageData: { secureUrl: string; publicId: string } = {
      secureUrl: "",
      publicId: "",
    };
    if (featuredImageFile) {
      try {
        const deletePrevFeaturedImageResult = postToUpdate
          ?.featuredImage?.publicId
          ? await deleteFileFromCloudinary(
              postToUpdate?.featuredImage?.publicId!
            )
          : undefined;

        if (
          postToUpdate?.featuredImage?.secureUrl === "" ||
          deletePrevFeaturedImageResult.result === "ok"
        ) {
          const imageUploadResult = await uploadFileToCloudinary(
            featuredImageFile.path
          );

          if (imageUploadResult) {
            uploadedImageData.secureUrl =
              imageUploadResult.secure_url;
            uploadedImageData.publicId = imageUploadResult.public_id;

            fs.unlink(featuredImageFile.path, (err) => {
              if (err) console.error("Error deleting file:", err);
            });
          }
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          status: 500,
          message: "Error, couldn't update the blog. try again.",
          error,
        });
        return;
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        content,
        category,
        featuredImage: uploadedImageData,
      },
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Couldn't update the post",
      });
      return;
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Blog post updated successfully",
      updatedPost,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal Server Error while update the post",
      error: error.stack || error,
    });
  }
};

// Delete blog post
export const deleteBlog = async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    const isValidPostId = mongoose.isValidObjectId(postId);
    if (!isValidPostId) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid post ID",
      });
      return;
    }
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Post not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Blog post deleted successfully",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal Server Error while deleting the post",
      error: error.message || error,
    });
  }
};

// Like a Blog
export const likeBlog = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const userId = req.userId;
  try {
    if (!mongoose.isValidObjectId(postId)) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid post ID",
      });
      return;
    }
    if (!mongoose.isValidObjectId(userId)) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid user ID",
      });
      return;
    }
    const post = await Post.findById(postId).select("likes");
    if (!post) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Post not found",
      });
      return;
    }
    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId?.toString()
    );
    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId?.toString()
      );
    } else {
      post.likes.push(userId!);
    }
    // only get likes not entire post: for performance,

    await post.save();
    res.status(200).json({
      success: true,
      status: 200,
      message: alreadyLiked
        ? "Blog post unliked successfully"
        : "Blog post liked successfully",
      data: post.likes.length,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal Server Error while liking the post",
      error: error.message || error,
    });
  }
};

// Create a comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    const { comment } = req.body;
    if (!mongoose.isValidObjectId(postId)) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid post ID",
      });
      return;
    }
    if (!mongoose.isValidObjectId(userId)) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid user Id",
      });
      return;
    }
    const blogPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            user: userId,
            text: comment,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!blogPost) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "blog post not found",
      });
      return;
    }
    // await post.save();
    res.status(201).json({
      success: true,
      status: 201,
      message: "comment created successfully",
      data: blogPost.comments,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Something went wrong",
      error,
    });
    return;
  }
};

// get all comments for a blog post
export const getCommentsForBlog = async (
  req: Request,
  res: Response
) => {
  const postId = req.params.id;
  const userId = req.userId;
  try {
    const isValidPostId = mongoose.isValidObjectId(postId);
    if (!isValidPostId) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid post ID",
      });
      return;
    }
    if (!mongoose.isValidObjectId(userId)) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid user Id",
      });
      return;
    }
    const blogPost = await Post.findById(postId)
      .populate({
        path: "comments.user",
        select: "firstname lastname profileImage",
      })
      .select("comments");
    if (!blogPost) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Comments not found",
      });
      return;
    }
    blogPost.comments.sort(
      (a, b) =>
        new Date(b.createdAt!).getTime() -
        new Date(a.createdAt!).getTime()
    );

    res.status(200).json({
      success: true,
      status: 200,
      message: "Comments retrieved successfully",
      data: blogPost.comments,
    });

    return;
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal Server Error while retrieving comments",
      error: error.message || error,
    });
    return;
  }
};

// Like a comment
export const likeComment = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const blogId = req.params.id;
    const commentId = req.params.commentId;

    if (!mongoose.isValidObjectId(userId)) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid user Id",
      });
      return;
    }
    if (!mongoose.isValidObjectId(blogId)) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid blog Id",
      });
      return;
    }
    if (!mongoose.isValidObjectId(commentId)) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid comment Id",
      });
      return;
    }

    // First approach JavaScript logic
    // -----------
    // const blogPost = await Post.findById(blogId).select("comments");

    // if (!blogPost) {
    //   res.status(404).json({
    //     success: false,
    //     status: 404,
    //     message: "Blog post not found",
    //   });
    //   return;
    // }

    // const currentComment = blogPost.comments.find(
    //   (comment) => comment._id.toString() === commentId?.toString()
    // );

    // if (!currentComment) {
    //   res
    //     .status(404)
    //     .json({
    //       success: false,
    //       status: 404,
    //       message: "Comment not found",
    //     });
    //   return;
    // }

    // const alreadyLiked = currentComment?.likes?.some(
    //   (id) => id.toString() === userId?.toString()
    // );

    // if (alreadyLiked) {
    //   currentComment?.likes?.filter(
    //     (id) => id.toString() !== userId?.toString()
    //   );
    // } else {
    //   currentComment?.likes?.push(userId!);
    // }
    // await blogPost?.save();
    // res.status(200).json({
    //   success: true,
    //   status: 200,
    //   message: alreadyLiked
    //     ? "Comment unliked successfully"
    //     : "Comment liked successfully",
    // });
    // return;

    // Seccond approach mongodb query level appraoch

    const blogPost = await Post.findOne(
      { _id: blogId, "comments._id": commentId },
      { "comments.$": 1 }
    );
    if (!blogPost || !blogPost.comments[0]) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Comment not found",
      });
      return;
    }
    const alreadyLiked = blogPost.comments[0].likes?.some(
      (id) => id.toString() === userId?.toString()
    );
    if (alreadyLiked) {
      await Post.updateOne(
        { _id: blogId, "comments._id": commentId },
        { $pull: { "comments.$.likes": userId } }
      );
      res.status(200).json({
        success: true,
        status: 200,
        message: "Comment unliked successfully",
      });
      return;
    } else {
      await Post.updateOne(
        { _id: blogId, "comments._id": commentId },
        { $addToSet: { "comments.$.likes": userId } }
      );
      res.status(200).json({
        success: true,
        status: 200,
        message: "Comment liked successfully",
      });
      return;
    }
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      success: false,
      status: 500,
      message:
        error.message ||
        "Internal Server Error while retrieving comments",
      error: error.stack,
    });
    return;
  }
};
