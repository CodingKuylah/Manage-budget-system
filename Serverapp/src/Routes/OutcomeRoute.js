import express from "express";
import {
  getAllOutcome,
  getOutcomeById,
  minusOutcomeValue,
  deleteOutcome,
} from "../Controller/OutcomeController.js";

import { baseRoute } from "./Base/BaseRoute.js";
import { verifyToken } from "../Controller/AuthController.js";

const router = express.Router();

router.get(baseRoute + "outcome/:id", getOutcomeById);
router.get(baseRoute + "admin/outcome", getAllOutcome);
router.put(
  baseRoute + "outcome/minus-budget/:outcomeId",
  verifyToken,
  minusOutcomeValue
);
router.delete(baseRoute + "outcome/:id", deleteOutcome);

export default router;
