import { Sequelize } from "sequelize";
import db from "../../Configuration/Database.js";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

const Histories = db.define(
  "tb_m_histories",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4(),
      allowNull: false,
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
    amount: {
      type: DataTypes.DECIMAL(20, 3),
      allowNull: false,
    },
    total_balance: {
      type: DataTypes.DECIMAL(20, 3),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["INCOME", "OUTCOME", "BUDGET_CREATE"],
      allowNull: false,
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Histories;

async () => {
  try {
    await db.sync();
  } catch (error) {
    console.error("error syncing histories database " + error);
  }
};
