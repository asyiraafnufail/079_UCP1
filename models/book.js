import DataTypes from "sequelize";
import sequelize from "../config/database.js";

const Book = sequelize.define(
  "Book",
  {
    idbuku: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pengarang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tahun: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bidang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "buku",
    timestamps: false,
  }
);

export default Book;
