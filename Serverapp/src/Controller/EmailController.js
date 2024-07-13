import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import transporter from "../Configuration/EmailConfig.js";
import { handleResponse } from "../Domains/Constants/HandleResponse.js";
import { handleError } from "../Domains/Constants/HandleError.js";
import User from "../Domains/Entitites/User.js";
import Budget from "../Domains/Entitites/Budget.js";

const _fileName = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_fileName);

// send single email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    to,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.info("Email sent:", info.response);
    }
  });
};

const sendBudgetEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    const mail = sendEmail(to, subject, text);
    handleResponse(res, mail, 200, "email sent successfully");
  } catch (error) {
    handleError(res, error);
  }
};
// send single email end

const sendEmailWithHtml = (to, subject, html) => {
  const mailOptions = {
    from: "fajar.anwarimaulana99@gmail.com",
    to,
    subject,
    html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email : ", error);
    } else {
      console.info("Email sent : ", info.response);
    }
  });
};

const scheduleMonthlyEmail = async () => {
  try {
    const users = await User.findAll();
    const htmlTemplatePath = path.join(
      _dirname,
      "../../public/Templates/EmailTemplate.html"
    );
    const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf8");
    for (const user of users) {
      const email = user.email;
      const budget = await Budget.findOne({ where: { userId: user.id } });
      const html = htmlTemplate
        .replace("{first_name}", user.first_name)
        .replace("{total_balance}", budget.total_balance);
      sendEmailWithHtml(email, "Monthly Budget Report", html);
    }
  } catch (error) {
    console.error("Error in scheduleMonthlyEmail:", error);
  }
};

// const scheduleMonthlyEmail = async () => {
//   try {
//     const users = await User.findAll();
//     for (const user of users) {
//       const email = user.email;
//       const budget = await Budget.findOne({ where: { userId: user.id } });
//       const text = `Hello ${user.first_name},\nYour remaining budget is: ${budget.total_balance}`;
//       sendEmail(email, "Monthly Budget Report", text);
//     }
//   } catch (error) {
//     handleError(res, error);
//   }
// };

export { sendBudgetEmail, scheduleMonthlyEmail };
