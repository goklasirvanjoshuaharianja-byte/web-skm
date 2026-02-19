const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: String,
  bio: String,
  instagram: String,
  linkedin: String,
  photo: {
    type: String,
    default: "default.png"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Member", MemberSchema);
