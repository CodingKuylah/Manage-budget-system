import express from "express";
import {
  register,
  login,
  verifyToken,
  getAllUser,
} from "../Controller/AuthController.js";
import { baseRoute } from "./Base/BaseRoute.js";

const router = express.Router();

router.get(baseRoute + "auth/admin", verifyToken, getAllUser);
router.post(baseRoute + "auth/register", register);
router.post(baseRoute + "auth/login", login);

export default router;
