import { Sequelize } from "sequelize";
import db from "../../../Configuration/Database.js";
import { v4 as uuidV4 } from "uuid";

const { DataTypes } = Sequelize;

const ClientHistories = db.define(
  "tb_m_client_histories",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidV4(),
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 35],
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 35],
      },
    },
    last_name: {
      type: DataTypes.STRING,
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
    account_status: {
      type: DataTypes.ENUM,
      values: [
        "ACCOUNT_DELETED",
        "ACCOUNT_BANNED",
        "UNVERIFIED",
        "VERIFIED",
        "LOGIN_FAILED_ONCE",
        "LOGIN_FAILED_TWICE",
      ],
    },
    type: {
      type: DataTypes.ENUM,
      values: ["REGISTER", "VERIFY_ACCOUNT", "UPDATE_PROFILE"],
    },
    created_date: {
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
export default ClientHistories;
