import mongoose, { connection } from "mongoose";

export default async function connectDb() {
  const url = "mongodb://localhost:27017/";
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mernBlogApp");
    // const host = connectionInstance.connection.host;
    console.log(`Database successfully connected, DB HOST:`);
  } catch (error) {
    console.log("MongoDb connection failed, error: ", error);
    process.exit(1);
  }
}
