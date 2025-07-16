import shortid from "shortid"; 
import Url from "../models/UrlSchema.js"; 


const createShortUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const shortCode = shortid.generate();
    const newUrl = new Url({
      url,
      shortCode,
    });

    await newUrl.save();
    res.status(201).json({
      id: newUrl._id,
      url: newUrl.url,
      shortCode: newUrl.shortCode,
      createdAt: newUrl.createdAt,
      updatedAt: newUrl.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve original URL from short URL
const retrieveOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    url.accessCount += 1;
    await url.save();

    res.status(200).json({
      id: url._id,
      url: url.url,
      shortCode: url.shortCode,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing short URL
const updateShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const updatedUrl = await Url.findOneAndUpdate(
      { shortCode },
      { url, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedUrl) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.status(200).json({
      id: updatedUrl._id,
      url: updatedUrl.url,
      shortCode: updatedUrl.shortCode,
      createdAt: updatedUrl.createdAt,
      updatedAt: updatedUrl.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a short URL
const deleteShortUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const deletedUrl = await Url.findOneAndDelete({ shortCode });
    if (!deletedUrl) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get statistics for a short URL
const getStatistics = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.status(200).json({
      id: url._id,
      url: url.url,
      shortCode: url.shortCode,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
      accessCount: url.accessCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createShortUrl,
  retrieveOriginalUrl,
  updateShortUrl,
  deleteShortUrl,
  getStatistics,
};
