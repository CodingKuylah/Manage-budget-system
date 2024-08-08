import nodemailer from "nodemailer";
import { MAIL_PASSWORD, MAIL_USERNAME } from "../CredentialData/Credential.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,

  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});

export default transporter;
