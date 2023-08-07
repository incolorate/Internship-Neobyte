import express from "express";
import getLatestAds from "./scrapping.js";
import mongoose from "mongoose";
import Ad from "./models/adSchema.js";

const router = express.Router();

router.get("/ads", async (req, res) => {
  let ads;
  try {
    ads = await Ad.find({});
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json(ads);
});

export default router;
