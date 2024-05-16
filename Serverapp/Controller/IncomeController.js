import Income from "../Domains/Entitites/Income.js";
import { handleError } from "../Domains/Constants/HandleError.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";
import { getPagination, getPagingData } from "../Utils/PaginationUtils.js";

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

export { getIncomeById, getAllIncome };
