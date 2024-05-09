import express from "express";
import cors from "cors";

import BudgetRoute from "./Routes/BudgetRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(BudgetRoute);

app.listen("5000", () => {
  console.log(
    "\n <==================> \n Server App is Running \n <==================> \n"
  );
});
