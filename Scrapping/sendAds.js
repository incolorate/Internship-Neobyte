import express from "express";
import getLatestAds from "./scrapping.js";

const router = express.Router();

router.get("/ads", (req, res) => {
  getLatestAds();

  return res.send();
});

export default router;
