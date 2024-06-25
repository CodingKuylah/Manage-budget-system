import express from "express";
import {
  getById,
  getAllBudget,
  createSingleBudget,
  deleteBudget,
} from "../Controller/BudgetController.js";
import { baseRoute } from "./Base/BaseRoute.js";

const router = express.Router();

router.get(baseRoute + "budget/:id", getById);
router.get(baseRoute + "admin/budget", getAllBudget);
router.post(baseRoute + "budget/insert", createSingleBudget);
router.delete(baseRoute + "admin/budget/:id", deleteBudget);

export default router;
