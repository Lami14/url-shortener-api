// src/app.js

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

const urlRoutes = require("./routes/urlRoutes");

dotenv.config();

// connect database
connectDB();

const app = express();

// middleware
app.use(express.json());

// serve static frontend files
app.use(express.static(path.join(__dirname, "../public")));

// API routes
app.use("/api/url", urlRoutes);

// redirect route for shortened URLs
app.get("/:code", async (req, res) => {
  const Url = require("./models/Url");

  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    url.clicks++;
    await url.save();

    res.redirect(url.longUrl);

  } catch (error) {
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
