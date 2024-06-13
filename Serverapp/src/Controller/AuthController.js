import { handleError } from "../Domains/Constants/HandleError.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";
import RegisterResponse from "../Domains/Models/Responses/RegisterResponse.js";
import Account from "../Domains/Entitites/Account.js";
import User from "../Domains/Entitites/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import LoginResponse from "../Domains/Models/Responses/LoginResponse.js";

function emailValidator(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.(com|co\.id)$/i;
  return emailPattern.test(email);
}

async function register(req, res) {
  try {
    const {
      first_name,
      last_name,
      username,
      password,
      confirm_password,
      email,
      number_phone,
      gender,
    } = req.body;

    if (!emailValidator(email)) {
      return handleResponse(
        res,
        email,
        400,
        "Invalid email format. Email must contain '@' and a valid domain like '.com' or '.co.id'"
      );
    }
    if (confirm_password !== password) {
      return handleResponse(
        res,
        password,
        400,
        "confirm password must be match with password! "
      );
    }
    const salt = await bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      number_phone: number_phone,
      gender: gender,
    });

    await Account.create({
      id: newUser.id,
      username: username,
      password: hashPassword,
    });

    const handlingResponse = new RegisterResponse(username, password);
    handleResponse(res, handlingResponse, 200, "Register is successfully");
  } catch (error) {
    handleError(res, error);
  }
}

async function login(req, res) {
  try {
    const account = await Account.findOne({
      where: {
        username: req.body.username,
      },
    });
    const matching = await bcryptjs.compare(
      req.body.password,
      account.password
    );
    if (!matching) {
      return handleResponse(res, req, 400, "Wrong password");
    }
    const accountId = account.id;
    const accessToken = jwt.sign(
      { accountId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { accountId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Account.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: accountId,
        },
      }
    );
    const user = await User.findOne({
      where: {
        id: accountId,
      },
    });
    const handlingResponse = new LoginResponse(
      req.body.username,
      user.email,
      user.gender,
      accessToken
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure true is used when this serverapp go live (for https)
      // secure: true
    });
    handleResponse(res, handlingResponse, 200, "Login is successfully ");
  } catch (error) {
    handleError(res, error);
  }
}

export { register, login };
