import Account from "../Account.js";
import User from "../User.js";
import Budget from "../Budget.js";
import Income from "../Income.js";
import Outcome from "../Outcome.js";
import BudgetHistories from "../Histories/BudgetHistories.js";
import ClientHistories from "../Histories/ClientHistories.js";

// relation one to one between account and user
Account.belongsTo(User, {
  foreignKey: "id",
  as: "user",
});

User.hasOne(Account, {
  foreignKey: "id",
  as: "account",
});
// relation one to one between account and user end

// relation one to many between user and ClientHistories
User.hasMany(ClientHistories, { foreignKey: "userId" });
// relation one to many between user and ClientHistories end

// relation one to many between budget and income
Budget.hasMany(Income, { foreignKey: "budgetId" });
// relation one to many between budget and income end

// relation one to many between budget and outcome
Budget.hasMany(Outcome, { foreignKey: "budgetId" });
// relation one to many between budget and income end

// relation one to many between budget and BudgetHistories
Budget.hasMany(BudgetHistories, { foreignKey: "budgetId" });
// relation one to many between budget and BudgetHistories end

// relation one to many between income and BudgetHistories
Income.hasMany(BudgetHistories, { foreignKey: "incomeId" });
// relation one to many between income and BudgetHistories end

// relation one to many between outcome and BudgetHistories
Outcome.hasMany(BudgetHistories, { foreignKey: "outcomeId" });
// relation one to many between outcome and BudgetHistories end
