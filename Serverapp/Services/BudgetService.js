import Budget from "../Domains/Entitites/Budget.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";
import { handleError } from "../Domains/Constants/HandleError.js";

export const getById = async (req, res) => {
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
};
