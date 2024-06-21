import { Sequelize } from "sequelize";

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

console.info(process.env.DATABASE_TABLE);
const db = new Sequelize("db_MANAGEMENT_BUDGET_SYSTEM", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
  timezone: "+07:00",
});

export default db;
