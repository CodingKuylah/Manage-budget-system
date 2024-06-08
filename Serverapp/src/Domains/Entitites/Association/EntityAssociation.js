import Account from "../Account.js";
import User from "../User.js";
import Budget from "../Budget.js";
import Income from "../Income.js";
import Outcome from "../Outcome.js";
import Histories from "../Histories.js";

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

// relation one to many between budget and income
Budget.hasMany(Income, { foreignKey: "BudgetId" });
// relation one to many between budget and income end

// relation one to many between budget and outcome
Budget.hasMany(Outcome, { foreignKey: "BudgetId" });
// relation one to many between budget and income end

// relation one to many between budget and histories
Budget.hasMany(Histories, { foreignKey: "budgetId" });
// relation one to many between budget and histories end

// relation one to many between income and histories
Income.hasMany(Histories, { foreignKey: "incomeId" });
// relation one to many between income and histories end

// relation one to many between outcome and histories
Outcome.hasMany(Histories, { foreignKey: "outcomeId" });
// relation one to many between outcome and histories end
