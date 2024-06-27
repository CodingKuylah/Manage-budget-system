import { handleError } from "../Domains/Constants/HandleError.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";
import { getPagination, getPagingData } from "../Utils/PaginationUtils.js";
import BudgetHistories from "../Domains/Entitites/Histories/BudgetHistories.js";

async function getHistoryById(req, res) {
  try {
    const data = await BudgetHistories.findAndCountAll({
      where: {
        id: req.params.id,
      },
    });
    handleResponse(res, data, 200, "History successfully retrieved");
  } catch (error) {
    handleError(res, error);
  }
}

async function getAllHistories(req, res) {
  const { page, pageSize, order = "DESC" } = req.query;
  const { limit, offset } = getPagination(page, pageSize);

  try {
    const data = await BudgetHistories.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["created_date", order]],
    });
    const response = getPagingData(data, page, limit);
    res.send(response);
  } catch (error) {
    handleError(res, error);
  }
}

async function getAllHistoriesByBudgetId(req, res) {
  const budgetId = req.params.budgetId;
  const { page, pageSize } = req.query;
  const { limit, offset } = getPagination(page, pageSize);

  try {
    const data = await BudgetHistories.findAndCountAll({
      where: {
        budgetId: budgetId,
      },
      limit: limit,
      offset: offset,
    });
    const response = getPagingData(data, page, limit);
    if (data.rows.length > 0) {
      handleResponse(res, response, 200, "History successfully retrived");
    } else {
      res.status(404).json({
        error: "No History found for this budget",
      });
    }
  } catch (error) {
    handleError(res, error);
  }
}

async function getAllHistoryByIncomeId(req, res) {
  const incomeId = req.params.incomeId;
  const { page, pageSize } = req.query;
  const { limit, offset } = getPagination(page, pageSize);

  try {
    const data = await BudgetHistories.findAndCountAll({
      where: {
        incomeId: incomeId,
        type: "INCOME",
      },
      limit: limit,
      offset: offset,
    });
    const response = getPagingData(data, page, limit);
    if (data.rows.length > 0) {
      handleResponse(res, response, 200, "History successfully retrieved");
    } else {
      res.status(404).json({
        error: "History is not found",
      });
    }
  } catch (error) {
    handleError(res, error);
  }
}

async function getAllHistoryByOutcomeId(req, res) {
  const outcomeId = req.params.outcomeId;
  const { page, pageSize } = req.query;
  const { limit, offset } = getPagination(page, pageSize);

  try {
    const data = await BudgetHistories.findAndCountAll({
      where: {
        outcomeId: outcomeId,
        type: "OUTCOME",
      },
      limit: limit,
      offset: offset,
    });
    const response = getPagingData(data, page, limit);
    if (data.rows.length > 0) {
      handleResponse(res, response, 200, "History successfully retrieved");
    } else {
      res.status(404).json({
        error: "History is not found",
      });
    }
  } catch (error) {
    handleError(res, error);
  }
}

export {
  getHistoryById,
  getAllHistories,
  getAllHistoriesByBudgetId,
  getAllHistoryByIncomeId,
  getAllHistoryByOutcomeId,
};
