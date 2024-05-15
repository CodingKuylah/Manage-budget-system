import express from "express";
import {
  getById,
  getAllBudget,
  createBudget,
  deleteBudget,
} from "../Controller/BudgetController.js";

const router = express.Router();

router.get("/budget/:id", getById);
router.get("/budget", getAllBudget);
router.post("/budget", createBudget);
router.delete("/budget/:id", deleteBudget);

export default router;
