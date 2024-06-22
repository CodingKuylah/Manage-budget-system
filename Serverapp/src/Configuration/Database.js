import { Sequelize } from "sequelize";
import {
  DATABASE_PASSWORD,
  DATABASE_TABLE,
  DATABASE_USERNAME,
} from "../CredentialData/Credential.js";

// const db = new Sequelize(
//   process.env.DATABASE_TABLE,
//   process.env.DATABASE_USERNAME,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: "localhost",
//     dialect: "mysql",
//     logging: console.log,
//     timezone: "+07:00",
//   }
// );

const db = new Sequelize(DATABASE_TABLE, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
  timezone: "+07:00",
});

export default db;
