const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  title: String,
  image: String,
  date: Date
});

module.exports = mongoose.model("Gallery", GallerySchema);
