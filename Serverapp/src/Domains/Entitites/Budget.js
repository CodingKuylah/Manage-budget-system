import { Sequelize } from "sequelize";
import db from "../../Configuration/Database.js";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

const Budget = db.define(
  "tb_m_budgets",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4(),
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 150],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [5, 350],
      },
    },
    total_balance: {
      type: DataTypes.DECIMAL(20, 3),
      allowNull: false,
      defaultValue: 0.0,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_by: {
      type: DataTypes.STRING,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
    delete_by: {
      type: DataTypes.STRING,
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Budget.hasMany(Income, { foreignKey: "BudgetId" });
// Budget.hasMany(Outcome, { foreignKey: "BudgetId" });
// Budget.hasMany(Histories, { foreignKey: "budgetId" });

export default Budget;

// (async () => {
//   try {
//     await db.sync();
//   } catch (error) {
//     console.error("error syncing budget database" + error);
//   }
// })();
