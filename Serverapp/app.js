import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import BudgetRoute from "./src/Routes/BudgetRoute.js";
import IncomeRoute from "./src/Routes/IncomeRoute.js";
import OutcomeRoute from "./src/Routes/OutcomeRoute.js";
import HistoriesRoute from "./src/Routes/HistoriesRoute.js";
import AuthRoute from "./src/Routes/AuthRoute.js";
import EmailRoute from "./src/Routes/EmailRoute.js";
import db from "./src/Configuration/Database.js";
import "./src/Domains/Entitites/Association/EntityAssociation.js";
import cookieParser from "cookie-parser";
import "./src/Controller/Scheduler/SchedulerController.js";

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

db.authenticate()
  .then(() => {
    console.log("db is connected");
    // db.sync({ force: true })
    db.sync({ alter: true })
      .then(() => {
        app.listen("5000", () => {
          console.log(
            "\n <==================> \n Server App is Running \n <==================> \n"
          );
        });
      })
      .catch((error) => {
        console.error("failed to connect to database" + error);
      });
  })
  .catch((error) => {
    console.error("cannot connect to database" + error);
  });

app.use(
  BudgetRoute,
  IncomeRoute,
  OutcomeRoute,
  HistoriesRoute,
  AuthRoute,
  EmailRoute
);
