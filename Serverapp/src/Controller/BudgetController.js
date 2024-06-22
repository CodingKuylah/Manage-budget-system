import Budget from "../Domains/Entitites/Budget.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";
import { handleError } from "../Domains/Constants/HandleError.js";
import { getPagination, getPagingData } from "../Utils/PaginationUtils.js";
import BudgetRequest from "../Domains/Models/Requests/BudgetRequest.js";
import Income from "../Domains/Entitites/Income.js";
import Outcome from "../Domains/Entitites/Outcome.js";
import BudgetResponse from "../Domains/Models/Responses/BudgetResponse.js";
import BudgetHistories from "../Domains/Entitites/Histories/BudgetHistories.js";
import UserBudget from "../Domains/Entitites/TransactionalTable/UserBudget.js";
import UserIncome from "../Domains/Entitites/TransactionalTable/UserIncome.js";
import UserOutcome from "../Domains/Entitites/TransactionalTable/UserOutcome.js";

async function getById(req, res) {
  try {
    const data = await Budget.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (data) {
      handleResponse(res, data, 200, "Budget successfully retrived");
    } else {
      res.status(404).json({ error: "Budget is not found" });
    }
  } catch (error) {
    handleError(res, error);
  }
}

async function getAllBudget(req, res) {
  const { page, pageSize } = req.query;
  const { limit, offset } = getPagination(page, pageSize);

  try {
    const data = await Budget.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    const response = getPagingData(data, page, limit);
    res.send(response);
  } catch (error) {
    handleError(res, error);
  }
}

async function createSingleBudget(req, res) {
  const { title, description, total_balance, userId } = req.body;
  const budgetRequest = new BudgetRequest(title, description, total_balance);
  const validationErrors = budgetRequest.validate();

  if (validationErrors.length > 0) {
    res.status(400).json({ errors: validationErrors });
    return;
  }

  const finalTotalBalance = total_balance || 0.0;

  try {
    const newBudget = await Budget.create({
      title: budgetRequest.title,
      description: budgetRequest.description,
      total_balance: finalTotalBalance,
      created_by: "System",
    });

    const newIncome = await Income.create({
      title: "Default",
      description: "Default by system",
      created_by: "System",
      budgetId: newBudget.id,
      updated_by: "System",
      amount: 0.0,
    });

    const newOutcome = await Outcome.create({
      title: "Default",
      description: "Default by system",
      approval_status: "APPROVED",
      created_by: "System",
      budgetId: newBudget.id,
      updated_by: "System",
      amount: 0.0,
    });

    await BudgetHistories.create({
      title: budgetRequest.title,
      description: budgetRequest.description,
      amount: 0.0,
      total_balance: finalTotalBalance,
      type: "BUDGET_CREATE",
      created_by: "System",
      incomeId: newIncome.id,
      outcomeId: newOutcome.id,
      budgetId: newBudget.id,
    });

    await UserBudget.create({
      userId: userId,
      budgetId: newBudget.id,
    });

    await UserIncome.create({
      userId: userId,
      incomeId: newIncome.id,
    });

    await UserOutcome.create({
      userId: userId,
      outcomeId: newOutcome.id,
    });

    const handlingResponse = new BudgetResponse(
      newBudget.id,
      newBudget.title,
      newBudget.description,
      newIncome.id,
      newOutcome.id,
      userId
    );
    handleResponse(res, handlingResponse, 200, "Budget successfully created !");
  } catch (error) {
    handleError(res, error);
  }
}

async function deleteBudget(req, res) {
  try {
    const id = req.params.id;
    const budget = await Budget.findOne({
      where: {
        id: id,
        is_deleted: 0,
      },
    });
    if (budget) {
      budget.is_deleted = 1;
      await budget.save();
      handleResponse(res, budget, 200, "Budget is successfully been deleted");
    } else {
      res.status(404).json({ error: "budget id is not found" });
    }
  } catch (error) {
    handleError(res, error);
  }
}
export { getById, getAllBudget, createSingleBudget, deleteBudget };
