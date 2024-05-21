import express from "express";
import cors from "cors";

import BudgetRoute from "./Routes/BudgetRoute.js";
import IncomeRoute from "./Routes/IncomeRoute.js";
import OutcomeRoute from "./Routes/OutcomeRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(BudgetRoute, IncomeRoute, OutcomeRoute);

app.listen("5000", () => {
  console.log(
    "\n <==================> \n Server App is Running \n <==================> \n"
  );
});
