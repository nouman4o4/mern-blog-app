import express from "express";
import connectDb from "./utils/db";
import authRouter from "./routes/auth-route";
import { configDotenv } from "dotenv";

const app = express();
const port = 3000;

configDotenv();
app.use("/api/users", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  await connectDb();
  console.log("app is running on port: " + port);
});
