import mongoose, { connection } from "mongoose";

export default async function connectDb() {
  const url = process.env.MONGODB_URI as string;
  try {
    await mongoose.connect(url);
    // const host = connectionInstance.connection.host;
    console.log(`Database successfully connected, DB HOST:`);
  } catch (error) {
    console.log("MongoDb connection failed, error: ", error);
    process.exit(1);
  }
}
