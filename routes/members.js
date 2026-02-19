const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const multer = require("multer");
const path = require("path");

// =====================
// KONFIGURASI MULTER
// =====================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// =====================
// FORM TAMBAH ANGGOTA
// =====================
router.get("/tambah", (req, res) => {
  res.render("tambah-anggota");
});

// =====================
// PROSES SIMPAN ANGGOTA
// =====================
router.post("/tambah", upload.single("photo"), async (req, res) => {
  try {
    const { name, position, bio, instagram, linkedin } = req.body;

    await Member.create({
      name,
      position,
      bio,
      instagram,
      linkedin,
      photo: req.file ? req.file.filename : "default.png"
    });

    res.redirect("/anggota");
  } catch (err) {
    console.log(err);
    res.send("Terjadi kesalahan");
  }
});

// =====================
// LIST ANGGOTA
// =====================
router.get("/", async (req, res) => {
  const members = await Member.find().sort({ createdAt: -1 });
  res.render("anggota", { members });
});

// =====================
// DETAIL PROFILE
// =====================
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.send("Member tidak ditemukan");
    res.render("profile", { member });
  } catch (err) {
    res.send("Member tidak ditemukan");
  }
});

module.exports = router;
