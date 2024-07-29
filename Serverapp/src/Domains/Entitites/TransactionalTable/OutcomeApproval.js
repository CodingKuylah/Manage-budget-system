import { Sequelize } from "sequelize";
import db from "../../../Configuration/Database.js";
import { v4 as uuidV4 } from "uuid";

const { DataTypes } = Sequelize;

const OutcomeApproval = db.define(
  "tb_tr_outcome_approval",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidV4(),
      allowNull: false,
    },
    outcomeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approvalId: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["PENDING", "APPROVED", "REJECTED"],
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

export default OutcomeApproval;
