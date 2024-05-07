import Budget from "../Domains/Entitites/Budget.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";
import { handleError } from "../Domains/Constants/HandleError.js";
import { getPagination, getPagingData } from "../Utils/PaginationUtils.js";

async function getById(req, res) {
  try {
    const response = await Budget.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (response) {
      handleResponse(
        res,
        response,
        200,
        "Budget " + req.params.id + " successfully retrieved"
      );
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

export { getById, getAllBudget };
