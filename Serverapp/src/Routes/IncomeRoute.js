import express from "express";
import {
  getIncomeById,
  getAllIncome,
  deleteIncome,
} from "../Controller/IncomeController.js";
import { baseRoute } from "./Base/BaseRoute.js";

const router = express.Router();

router.get(baseRoute + "income/:id", getIncomeById);
router.get(baseRoute + "admin/income", getAllIncome);
router.delete(baseRoute + "income/:id", deleteIncome);

export default router;
