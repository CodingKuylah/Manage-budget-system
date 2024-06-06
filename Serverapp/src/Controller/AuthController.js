import { handleError } from "../Domains/Constants/HandleError.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";
import RegisterResponse from "../Domains/Models/Responses/RegisterResponse.js";
import Account from "../Domains/Entitites/Account.js";
import User from "../Domains/Entitites/User.js";
import bcryptjs from "bcryptjs";

async function register(req, res) {
  try {
    const { username, password, email, numberPhone, gender } = req.body;
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({ name, email, numberPhone, gender });
    const newAccount = await Account.create({
      username,
      hashPassword,
      userId: newUser.id,
    });

    const handlingAccount = new RegisterResponse(newAccount.username, password);
    handleResponse(res, handlingAccount, 200, "User is successfully registred");
  } catch (error) {
    handleError(res, error);
  }
}

export { register };
