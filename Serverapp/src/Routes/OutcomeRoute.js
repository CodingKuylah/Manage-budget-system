import express from "express";
import {
  getAllOutcome,
  getOutcomeById,
  deleteOutcome,
} from "../Controller/OutcomeController.js";

const router = express.Router();

router.get("/outcome/:id", getOutcomeById);
router.get("admin/outcome", getAllOutcome);
router.delete("outcome/:id", deleteOutcome);

export default router;
