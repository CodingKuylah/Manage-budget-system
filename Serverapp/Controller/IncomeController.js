import Income from "../Domains/Entitites/Income.js";
import { handleError } from "../Domains/Constants/HandleError.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";

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

export { getIncomeById };
