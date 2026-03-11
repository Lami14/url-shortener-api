const Url = require("../models/Url");
const shortid = require("shortid");

// Create short URL
const createShortUrl = async (req, res) => {
  const { longUrl } = req.body;

  try {
    const shortCode = shortid.generate();

    const url = await Url.create({
      longUrl,
      shortCode
    });

    res.status(201).json({
      shortUrl: `${req.headers.host}/${shortCode}`
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Redirect
const redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    url.clicks++;
    await url.save();

    res.redirect(url.longUrl);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createShortUrl,
  redirectUrl
};
