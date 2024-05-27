import express from "express";
import {
  getIncomeById,
  getAllIncome,
  plusIncomeValue,
  deleteIncome,
} from "../Controller/IncomeController.js";
import { baseRoute } from "./Base/BaseRoute.js";

const router = express.Router();

router.get(baseRoute + "income/:id", getIncomeById);
router.get(baseRoute + "admin/income", getAllIncome);
router.put(baseRoute + "income/add-budget/incomeId", plusIncomeValue);
router.delete(baseRoute + "income/:id", deleteIncome);

export default router;
