import express from "express";
import { register } from "../Controller/AuthController.js";
import { baseRoute } from "./Base/BaseRoute.js";

const router = express.Router();

router.post(baseRoute + "idp/register", register);

export default router;
