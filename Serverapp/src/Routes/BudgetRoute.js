import express from "express";
import {
  getById,
  getAllBudget,
  connectBudgetAndUser,
  createSingleBudget,
  deleteBudget,
} from "../Controller/BudgetController.js";
import { baseRoute } from "./Base/BaseRoute.js";
import { verifyToken } from "../Controller/AuthController.js";

const router = express.Router();

router.get(baseRoute + "budget/:id", getById);
router.get(baseRoute + "admin/budget", getAllBudget);
router.post(baseRoute + "budget/connect", verifyToken, connectBudgetAndUser);
router.post(baseRoute + "budget/insert", createSingleBudget);
router.delete(baseRoute + "admin/budget/:id", deleteBudget);

export default router;
