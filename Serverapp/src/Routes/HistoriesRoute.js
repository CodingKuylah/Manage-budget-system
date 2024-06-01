import express from "express";
import {
  getHistoryById,
  getAllHistories,
  getAllHistoriesByBudgetId,
  getAllHistoryByIncomeId,
  getAllHistoryByOutcomeId,
} from "../Controller/HistoriesController.js";
import { baseRoute } from "./Base/BaseRoute.js";

const router = express.Router();

router.get(baseRoute + "history/:id", getHistoryById);
router.get(baseRoute + "admin/history", getAllHistories);
router.get(baseRoute + "history/budget/:budgetId", getAllHistoriesByBudgetId);
router.get(baseRoute + "history/income/:incomeId", getAllHistoryByIncomeId);
router.get(baseRoute + "history/outcome/:outcomeId", getAllHistoryByOutcomeId);

export default router;
