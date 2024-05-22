import express from "express";
import {
  getAllOutcome,
  getOutcomeById,
  deleteOutcome,
} from "../Controller/OutcomeController.js";
import { baseRoute } from "./Base/BaseRoute.js";

const router = express.Router();

router.get(baseRoute + "outcome/:id", getOutcomeById);
router.get(baseRoute + "admin/outcome", getAllOutcome);
router.delete(baseRoute + "outcome/:id", deleteOutcome);

export default router;
