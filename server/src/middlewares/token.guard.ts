import { Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ExtendedRequest } from "../interfaces/extendedRequest.interface";
dotenv.config();

const { JWT_SECRET_KEY } = process.env;

export const tokenGuard = () => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const accessToken: string = req.headers.authorization?.split(' ')?.pop();

      if (!accessToken) {
        return res.status(401).json({ message: "Access denied. No token provided." });
      }

      const verified = jwt.verify(accessToken, JWT_SECRET_KEY) as jwt.JwtPayload;

      req.userId = verified.userId;

      next();
    } catch (error) {
      if (error.message.includes("expired")) {
        return res.status(401).json(error.message);
      }
      return res.status(500).json(error.message);
    }
  };
};
