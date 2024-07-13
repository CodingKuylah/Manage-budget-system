import { sendBudgetEmail } from "../Controller/EmailController.js";
import express from "express";
import { baseRoute } from "./Base/BaseRoute.js";

const router = express.Router();

router.post(baseRoute + "email/single", sendBudgetEmail);

export default router;
