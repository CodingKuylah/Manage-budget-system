import express from "express";
import { register, login } from "../Controller/AuthController.js";
import { baseRoute } from "./Base/BaseRoute.js";

const router = express.Router();

router.post(baseRoute + "auth/register", register);
router.post(baseRoute + "auth/login", login);

export default router;
