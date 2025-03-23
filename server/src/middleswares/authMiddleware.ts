import { NextFunction, Request, Response, response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.cookie
    ?.split("; ")
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized request" });
    return;
  }

  try {
    const decode = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JwtPayload;

    if (decode?.exp && decode?.exp * 1000 < Date.now()) {
      res
        .status(401)
        .json({ message: "Token expired, please login again!" });
    }

    req.userId = decode.userId;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res
        .status(401)
        .json({ message: "Token expired, please login again!" });
    }
    res.status(401).json({ message: "Unauthorized request" });
  }
};
