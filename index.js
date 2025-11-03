import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import Book from "./models/book.js";

dotenv.config();
const app = express();
app.use(express.json());

sequelize
  .sync()
  .then(() => console.log("Database & tabel siap"))
  .catch((err) => console.error("Sync gagal:", err));

app.get("/buku", async (req, res) => {
  try {
    const buku = await Book.findAll();
    res.json(buku);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/buku/:id", async (req, res) => {
  try {
    const buku = await Book.findByPk(req.params.id);
    if (!buku) return res.status(404).json({ message: "Buku tidak ditemukan" });
    res.json(buku);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});