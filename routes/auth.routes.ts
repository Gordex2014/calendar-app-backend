/**
 * Auth routes
 * host + /api/${version}/auth
 */
import { Router } from "express";

import {
  createUser,
  loginUser,
  renewUser,
} from "../controllers/auth.controllers";
import {
  userLoginMiddleware,
  userRegisterMiddleware,
  validateJWT,
} from "../middlewares";

const router = Router();

router.post("/register", userRegisterMiddleware, createUser);

router.post("/login", userLoginMiddleware, loginUser);

router.get("/renew", validateJWT, renewUser);

export default router;
