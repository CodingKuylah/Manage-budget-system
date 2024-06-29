import { Sequelize } from "sequelize";
import {
  DATABASE_PASSWORD,
  DATABASE_TABLE,
  DATABASE_USERNAME,
  DATABASE_HOST,
} from "../CredentialData/Credential.js";

const db = new Sequelize(DATABASE_TABLE, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: "mysql",
  logging: console.log,
  timezone: "+07:00",
});

export default db;
