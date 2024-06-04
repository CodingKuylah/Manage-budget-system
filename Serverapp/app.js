import express from "express";
import cors from "cors";

import BudgetRoute from "./src/Routes/BudgetRoute.js";
import IncomeRoute from "./src/Routes/IncomeRoute.js";
import OutcomeRoute from "./src/Routes/OutcomeRoute.js";
import HistoriesRoute from "./src/Routes/HistoriesRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(BudgetRoute, IncomeRoute, OutcomeRoute, HistoriesRoute);

app.listen("5000", () => {
  console.log(
    "\n <==================> \n Server App is Running \n <==================> \n"
  );
});
