import Income from "../Domains/Entitites/Income.js";
import IncomeResponse from "../Domains/Models/Responses/IncomeResponse.js";
import { handleError } from "../Domains/Constants/HandleError.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";
import { getPagination, getPagingData } from "../Utils/PaginationUtils.js";
import Budget from "../Domains/Entitites/Budget.js";
import BudgetHistories from "../Domains/Entitites/Histories/BudgetHistories.js";

async function getIncomeById(req, res) {
  try {
    const data = await Income.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (data) {
      handleResponse(res, data, 200, "Income successfully retrived!");
    } else {
      res.status(404).json({ error: "income id is not found" });
    }
  } catch (error) {
    handleError(res, error);
  }
}

async function getAllIncome(req, res) {
  const { page, pageSize } = req.query;
  const { limit, offset } = getPagination(page, pageSize);
  try {
    const data = await Income.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    const response = getPagingData(data, page, limit);
    res.send(response);
  } catch (error) {
    handleError(res, error);
  }
}

async function deleteIncome(req, res) {
  try {
    const id = req.params.id;
    const income = await Income.findOne({
      where: {
        id: id,
        is_deleted: 0,
      },
    });
    if (income) {
      income.is_deleted = 1;
      await income.save();
      handleResponse(
        res,
        income,
        200,
        "Income with id : " + id + " is successfully deleted"
      );
    } else {
      res.status(404).json({ error: "Income with id " + id + " is not found" });
    }
  } catch (error) {
    handleError(res, error);
  }
}

async function plusIncomeValue(req, res) {
  const incomeId = req.params.incomeId;
  const { title, description, amount, budgetId } = req.body;
  try {
    const income = await Income.findOne({
      where: {
        id: incomeId,
        is_deleted: 0,
      },
    });
    if (!income) {
      handleResponse(res, null, 404, "income id is not found!");
    }
    income.title = title;
    income.description = description;
    income.amount = amount;
    await income.save();

    const budget = await Budget.findOne({
      where: {
        id: budgetId,
        is_deleted: 0,
      },
    });

    budget.total_balance =
      parseFloat(budget.total_balance) + parseFloat(amount);
    await budget.save();

    const newHistory = await BudgetHistories.create({
      title: title,
      description: description,
      amount: amount,
      total_balance: budget.total_balance,
      type: "INCOME",
      created_by: "Testing by system",
      incomeId: incomeId,
      budgetId: budgetId,
    });

    const handlingResponse = new IncomeResponse(
      income.id,
      budget.id,
      budget.title,
      budget.description,
      income.amount,
      budget.total_balance
    );

    handleResponse(
      res,
      handlingResponse,
      200,
      "Income has successfully added to budget!"
    );
  } catch (error) {
    handleError(res, error);
  }
}

export { getIncomeById, getAllIncome, deleteIncome, plusIncomeValue };
