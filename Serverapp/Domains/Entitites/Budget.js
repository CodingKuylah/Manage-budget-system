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
      defaultValue: uuidv4(),
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
      allowNull: false,
      validate: {
        len: [5, 350],
      },
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

export default Budget;

(async () => {
  try {
    await db.sync();
    console.log("db connecteed");
  } catch (error) {
    console.error("error syncing budget database" + error);
  }
})();
