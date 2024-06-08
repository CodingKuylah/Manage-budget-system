import { Sequelize } from "sequelize";
import db from "../../Configuration/Database.js";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

const Account = db.define(
  "tb_m_accounts",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4,
      allowNull: false,
      references: {
        model: "tb_m_users",
        key: "id",
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 35],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verificationCode: {
      type: DataTypes.STRING,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
    timestamps: true,
  }
);

// Account.belongsTo(User, {
//   foreignKey: "user_id",
//   as: "user",
// });

export default Account;

// async () => {
//   try {
//     await db.sync();
//   } catch (error) {
//     console.error("error syncing account database" + error);
//   }
// };
