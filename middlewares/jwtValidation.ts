import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { clientError } from "../network/response";
import { config } from "../config/config";
import { JWTUserPayload } from "../types/jwtPayload";
import { User } from "../models";

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");
  if (!token) {
    return clientError(res, "There is no token in petition", 401);
  }
  try {
    const { name, uid } = jwt.verify(token, config.secret) as JWTUserPayload;
    const user = await User.findById(uid);
    if (!user) {
      return clientError(res, "Invalid token", 401);
    }
    if (!user.active) {
      return clientError(res, "Invalid token", 401);
    }
    req.user = user;
    req.uid = uid;
    req.name = name;
  } catch (err) {
    return clientError(res, "Invalid token", 401);
  }
  next();
};
