import mongoose, { connection } from "mongoose";

export default async function connectDb() {
  const url = "mongodb://localhost:27017/";
  try {
    await mongoose.connect("mongodb://localhost:27017/mernBlogApp");
    // const host = connectionInstance.connection.host;
    console.log(`Databse connected, DB HOST:`);
  } catch (error) {
    console.log("MongoDb connection failed, error: ", error);
    process.exit(1);
  }
}
