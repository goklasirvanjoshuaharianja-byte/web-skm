require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/organisasi")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
const indexRouter = require("./routes/index");
const membersRouter = require("./routes/members");
const galleryRouter = require("./routes/gallery");

app.use("/", indexRouter);
app.use("/anggota", membersRouter);
app.use("/gallery", galleryRouter);

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
