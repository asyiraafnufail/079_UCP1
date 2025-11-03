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

app.post("/buku", async (req, res) => {
  try {
    const { judul, pengarang, tahun, bidang } = req.body;
    const bukuBaru = await Book.create({ judul, pengarang, tahun, bidang });
    res.status(201).json(bukuBaru);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/buku/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, pengarang, tahun, bidang } = req.body;

    const buku = await Book.findByPk(id);
    if (!buku) return res.status(404).json({ message: "Buku tidak ditemukan" });

    await buku.update({ judul, pengarang, tahun, bidang });
    res.json(buku);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/buku/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const buku = await Book.findByPk(id);
    if (!buku) return res.status(404).json({ message: "Buku tidak ditemukan" });

    await buku.destroy();
    res.json({ message: "Buku berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});