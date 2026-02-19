const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");

router.get("/", async (req, res) => {
  const gallery = await Gallery.find();
  res.render("gallery", { gallery });
});

module.exports = router;
