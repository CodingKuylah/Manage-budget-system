import express from "express";
import { getById, getAllBudget } from "../Services/BudgetService.js";

const router = express.Router();

router.get("budget/:id", getById);
router.get("budget", getAllBudget);

export default router;
