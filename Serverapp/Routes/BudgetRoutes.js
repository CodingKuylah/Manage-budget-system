import express from "express";
import { getById } from "../Services/BudgetService.js";

const router = express.Router();

router.get("budget/:id", getById);

export default router;
