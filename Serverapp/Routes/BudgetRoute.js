import express from "express";
import {
  getById,
  getAllBudget,
  createBudget,
} from "../Services/BudgetService.js";

const router = express.Router();

router.get("budget/:id", getById);
router.get("budget", getAllBudget);
router.post("budget", createBudget);

export default router;
