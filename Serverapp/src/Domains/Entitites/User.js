import { Sequelize } from "sequelize";
import db from "../../Configuration/Database.js";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

const User = db.define(
  "tb_m_users",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4(),
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 35],
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 35],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    number_phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["MALE", "FEMALE"],
      allowNull: false,
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
    timestamps: false,
  }
);

// User.hasOne(Account, {
//   foreignKey: "user_id",
//   as: "account",
// });

export default User;

// async () => {
//   try {
//     await db.sync();
//   } catch (error) {
//     console.error("error syncing user database" + error);
//   }
// };
