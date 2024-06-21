import { Sequelize } from "sequelize";
import db from "../../../Configuration/Database.js";
import { v4 as uuidV4 } from "uuid";

const { DataTypes } = Sequelize;

const UserIncome = db.define(
  "tb_tr_user_income",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidV4(),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    incomeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default UserIncome;
