import { handleError } from "../Domains/Constants/HandleError.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";
import Histories from "../Domains/Entitites/Histories.js";
import { getPagination, getPagingData } from "../Utils/PaginationUtils.js";

async function getHistoryById(req, res) {
  const historyId = req.params.id;
  const { page, pageSize } = req.query;
  const { limit, offset } = getPagination(page, pageSize);
  try {
    const data = await Histories.findAndCountAll({
      where: {
        id: historyId,
      },
      limit: limit,
      offset: offset,
    });
    const response = getPagingData(data, page, limit);
    if (data.rows.length > 0) {
      handleResponse(res, response, 200, "History successfully retrieved");
    } else {
      res.status(404).json({ error: "History with id is not found" });
    }
  } catch (error) {
    handleError(res, error);
  }
}

async function getAllHistories(req, res) {
  const { page, pageSize } = req.query;
  const { limit, offset } = getPagination(page, pageSize);

  try {
    const data = await Histories.findAndCountAll({
      limit: limit,
      offset: offset,
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
    const data = await Histories.findAndCountAll({
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
    const data = await Histories.findAndCountAll({
      where: {
        incomeId: incomeId,
      },
      limit: limit,
      offset: offset,
    });
    const response = getPagingData(data, page, limit);
    if (data.rows.length > 0) {
      handleResponse(res, response, 200, "History successfully retrieved");
    } else {
      res.status(404).json({
        error: "History with income id is not found",
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
    const data = await Histories.findAndCountAll({
      where: {
        outcomeId: outcomeId,
      },
      limit: limit,
      offset: offset,
    });
    const response = getPagingData(data, page, limit);
    if (data.rows.length > 0) {
      handleResponse(res, response, 200, "History successfully retrieved");
    } else {
      res.status(404).json({
        error: "History with outcome id is not found",
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
