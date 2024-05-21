import express from "express";
import {
  getIncomeById,
  getAllIncome,
  deleteIncome,
} from "../Controller/IncomeController.js";

const router = express.Router();

router.get("/income/:id", getIncomeById);
router.get("admin/income", getAllIncome);
router.delete("income/:id", deleteIncome);

export default router;
