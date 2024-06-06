import express from "express";
import cors from "cors";

import BudgetRoute from "./src/Routes/BudgetRoute.js";
import IncomeRoute from "./src/Routes/IncomeRoute.js";
import OutcomeRoute from "./src/Routes/OutcomeRoute.js";
import HistoriesRoute from "./src/Routes/HistoriesRoute.js";
import AuthRoute from "./src/Routes/AuthRoute.js";
import Account from "./src/Domains/Entitites/Account.js";
import User from "./src/Domains/Entitites/User.js";

// User.hasOne(Account, { foreignKey: "user_id", as: "account" });
// Account.belongsTo(User, { foreignKey: "user_id", as: "user" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(BudgetRoute, IncomeRoute, OutcomeRoute, HistoriesRoute, AuthRoute);

app.listen("5000", () => {
  console.log(
    "\n <==================> \n Server App is Running \n <==================> \n"
  );
});
