import { Sequelize } from "sequelize";
import db from "../../Configuration/Database.js";
import { v4 as uuid4 } from "uuid";

const { DataTypes } = Sequelize;

const Outcome = db.define(
  "tb_m_outcome",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuid4(),
      allowNull: false,
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
    approval_status: {
      type: DataTypes.ENUM,
      values: ["APPROVED", "REJECTED"],
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
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    delete_by: {
      type: DataTypes.STRING,
      allowNull: true,
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

// Outcome.hasMany(Histories, { foreignKey: "outcomeId" });
export default Outcome;

// async () => {
//   try {
//     await db.sync();
//   } catch (error) {
//     console.error("Error syncing Outcome database " + error);
//   }
// };
