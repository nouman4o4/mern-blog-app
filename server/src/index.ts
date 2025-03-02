import express from "express";
import connectDb from "./utils/db";
import authRouter from "./routes/auth-route";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 3000;
configDotenv();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", authRouter);

app.listen(port, async () => {
  await connectDb();
  console.log("app is running on port: " + port);
});
