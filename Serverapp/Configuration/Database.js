import { Sequelize } from "sequelize";

const db = new Sequelize("db_MANAGEMENT_BUDGET_SYSTEM", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log(),
});

export default db;
