import express from "express";
import {
  createShortUrl,
  retrieveOriginalUrl,
  updateShortUrl,
  deleteShortUrl,
  getStatistics,
} from "../controllers/UrlController.js";

const URLrouter = express.Router();

URLrouter.post("/shorten", createShortUrl);
URLrouter.get("/shorten/:shortCode", retrieveOriginalUrl);
URLrouter.put("/shorten/:shortCode", updateShortUrl);
URLrouter.delete("/shorten/:shortCode", deleteShortUrl);
URLrouter.get("/shorten/:shortCode/stats", getStatistics);

export default URLrouter;
