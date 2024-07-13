import nodemailer from "nodemailer";
import { MAIL_USERNAME, MAIL_PASSWORD } from "../CredentialData/Credential.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,

  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});

export default transporter;
