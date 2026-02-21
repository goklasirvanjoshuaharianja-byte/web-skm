const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// CONFIG CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// STORAGE CLOUDINARY
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "web-skm",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// ===============================
// LIST ANGGOTA
// ===============================
router.get("/", async (req, res) => {
  const members = await Member.find();
  res.render("anggota", { members });
});

// ===============================
// FORM TAMBAH
// ===============================
router.get("/tambah", (req, res) => {
  res.render("tambah-anggota");
});

// ===============================
// SIMPAN ANGGOTA
// ===============================
router.post("/tambah", upload.single("photo"), async (req, res) => {
  try {
    const newMember = new Member({
      nama: req.body.nama,
      jabatan: req.body.jabatan,
      photo: req.file.path // URL dari Cloudinary
    });

    await newMember.save();
    res.redirect("/anggota");
  } catch (err) {
    console.log(err);
    res.send("Error saat menyimpan anggota");
  }
});

module.exports = router;