import Outcome from "../Domains/Entitites/Outcome.js";
import { handleError } from "../Domains/Constants/HandleError.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";
import { getPagingData, getPagination } from "../Utils/PaginationUtils.js";

async function getOutcomeById(req, res) {
  try {
    const data = await Outcome.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (data) {
      handleResponse(res, data, 200, "Outcome successfully retrived! ");
    } else {
      handleResponse(res, null, 404, "Outcome id is not found !");
    }
  } catch (error) {
    handleError(res, error);
  }
}

async function getAllOutcome(req, res) {
  const { page, pageSize } = req.query;
  const { limit, offset } = getPagination(page, pageSize);
  try {
    const data = await Outcome.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    const response = getPagingData(data, page, limit);
    res.send(response);
  } catch (error) {
    handleError(res, error);
  }
}

async function deleteOutcome(req, res) {
  try {
    const id = req.params.id;
    const outcomeData = await Outcome.findOne({
      where: {
        id: id,
        is_deleted: 0,
      },
    });
    if (outcomeData) {
      outcomeData.is_deleted = 1;
      await outcomeData.save();
      handleResponse(
        res,
        outcomeData,
        200,
        "Outcome with id : " + id + " is successfully deleted"
      );
    }
  } catch (error) {
    handleError(res, error);
  }
}

export { getOutcomeById, getAllOutcome, deleteOutcome };
