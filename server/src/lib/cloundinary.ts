import { v2 as cloudinary } from "cloudinary";

import "dotenv/config";
import fs from "fs";

export const uploadFileToCloudinary = async function (
  localFilePath: string
) {
  if (!localFilePath) return;

  // Configuration
  cloudinary.config({
    cloud_name: "dsvnh6opu",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Upload an image
  try {
    const uploadResult = await cloudinary.uploader.upload(
      localFilePath,
      {
        public_id: "blogImage",
        resource_type: "auto",
      }
    );

    return uploadResult;
  } catch (error) {
    console.log(
      "Error while uploading image to the cloudinary:",
      error
    );
  } finally {
    fs.unlink(localFilePath, (err) => {
      throw err;
    });
  }
};
