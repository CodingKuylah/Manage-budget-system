import Account from "../Account.js";
import User from "../User.js";
import Budget from "../Budget.js";
import Income from "../Income.js";
import Outcome from "../Outcome.js";
import BudgetHistories from "../Histories/BudgetHistories.js";
import ClientHistories from "../Histories/ClientHistories.js";
import UserBudget from "../TransactionalTable/UserBudget.js";
import UserIncome from "../TransactionalTable/UserIncome.js";
import UserOutcome from "../TransactionalTable/UserOutcome.js";

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

// relation many to many between user and budget
User.belongsToMany(Budget, { through: UserBudget, foreignKey: "userId" });
Budget.belongsToMany(User, { through: UserBudget, foreignKey: "budgetId" });
// relation many to many between user and budget end

// relation many to many between user and income
User.belongsToMany(Income, { through: UserIncome, foreignKey: "userId" });
Income.belongsToMany(User, { through: UserIncome, foreignKey: "incomeId" });
// relation many to many between user and income end

// relation many to many between user and outcome
User.belongsToMany(Outcome, { through: UserOutcome, foreignKey: "userId" });
Outcome.belongsToMany(User, { through: UserOutcome, foreignKey: "outcomeId" });
// relation many to many between user and outcome end
