import Outcome from "../Domains/Entitites/Outcome.js";
import { handleError } from "../Domains/Constants/HandleError.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";
import { getPagingData, getPagination } from "../Utils/PaginationUtils.js";
import Budget from "../Domains/Entitites/Budget.js";
import OutcomeResponse from "../Domains/Models/Responses/OutcomeResponse.js";

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

async function minusOutcomeValue(req, res) {
  const outcomeId = req.params.outcomeId;
  const { title, description, amount, approval_status, budgetId } = req.body;
  try {
    const outcome = await Outcome.findOne({
      where: {
        id: outcomeId,
        is_deleted: 0,
      },
    });
    if (!outcome) {
      handleResponse(res, null, 404, "Outcome id is not found!");
    }
    outcome.title = title;
    outcome.description = description;
    outcome.amount = amount;
    outcome.approval_status = approval_status;
    if (approval_status == "REJECTED") {
      return handleResponse(
        res,
        null,
        401,
        "Cannot minus amount budget (status rejected)"
      );
    }
    await outcome.save();

    const budget = await Budget.findOne({
      where: {
        id: budgetId,
        is_deleted: 0,
      },
    });
    budget.total_balance =
      parseFloat(budget.total_balance) - parseFloat(amount);
    await budget.save();

    const handlingResponse = new OutcomeResponse(
      outcomeId,
      budgetId,
      outcome.title,
      outcome.description,
      outcome.amount,
      outcome.approval_status,
      budget.total_balance
    );

    handleResponse(
      res,
      handlingResponse,
      200,
      "Outcome has succsessfully minus to budget!"
    );
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

export { getOutcomeById, getAllOutcome, minusOutcomeValue, deleteOutcome };
