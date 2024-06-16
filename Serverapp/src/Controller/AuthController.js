import { handleError } from "../Domains/Constants/HandleError.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";
import RegisterResponse from "../Domains/Models/Responses/RegisterResponse.js";
import Account from "../Domains/Entitites/Account.js";
import User from "../Domains/Entitites/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import LoginResponse from "../Domains/Models/Responses/LoginResponse.js";
import { getPagination, getPagingData } from "../Utils/PaginationUtils.js";
import { v4 as uuid } from "uuid";
import VerifyResponse from "../Domains/Models/Responses/VerifyResponse.js";

function emailValidator(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.(com|co\.id)$/i;
  return emailPattern.test(email);
}

async function getAllUser(req, res) {
  const { page, pageSize } = req.query;
  const { limit, offset } = getPagination(page, pageSize);
  try {
    const data = await User.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    const response = getPagingData(data, page, limit);
    handleResponse(res, response, 200, "User successfully retrieved");
  } catch (error) {
    handleError(res, error);
  }
}

async function register(req, res) {
  const generatedVerificationCode = uuid().toString();
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

    const newAccount = await Account.create({
      id: newUser.id,
      username: username,
      password: hashPassword,
      verification_code: generatedVerificationCode,
      account_status: "UNVERIFIED",
    });

    const handlingResponse = new RegisterResponse(
      username,
      password,
      generatedVerificationCode,
      newAccount.account_status
    );
    handleResponse(res, handlingResponse, 200, "Register is successfully");
  } catch (error) {
    handleError(res, error);
  }
}

async function verifyAccount(req, res) {
  const { username, verification_code } = req.body;
  try {
    const account = await Account.findOne({
      where: {
        username: username,
        verification_code: verification_code,
      },
    });
    if (account == null) {
      return handleResponse(res, req.body, 404, "Account is not found");
    }
    if (account.verification_code === verification_code) {
      await Account.update(
        { account_status: "VERIFIED", verification_code: null },
        {
          where: {
            username: account.username,
          },
        }
      );
      const handlingResponse = new VerifyResponse(account.username, "VERIFIED");
      return handleResponse(
        res,
        handlingResponse,
        200,
        "Verification account is successfully completed"
      );
    } else {
      return handleResponse(res, account, 400, "Invalid verification code");
    }
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

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res, null, 401, "Token is not valid";
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return handleError(res, err);
    }
    req.username = decoded.username;
    next();
  });
};

export { getAllUser, register, verifyAccount, login, verifyToken };
