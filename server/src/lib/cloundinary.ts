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
      if (err) console.log(err);
    });
  }
};

export const deleteFileFromCloudinary = async function (
  publicId: string
) {
  cloudinary.config({
    cloud_name: "dsvnh6opu",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const deleteResult = await cloudinary.uploader.destroy(publicId);
    return deleteResult;
  } catch (error) {
    console.log("Error while deleting image from cloudinary:", error);
  }
};
