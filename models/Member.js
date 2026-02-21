const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  jabatan: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Member", memberSchema);