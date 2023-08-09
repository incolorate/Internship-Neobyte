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

router.post("/test", async (req, res) => {
  const ad = {
    title: { ro: "Titlu now" },
    description: { ro: "Pret fain" },
    price: 3000,
    location: "Oradea",
  };
  try {
    await Ad.create(ad);
  } catch (error) {
    return res.json(error);
  }

  return res.json("Ad created");
});

router.put("/test2", async (req, res) => {
  try {
    await Ad.findOneAndUpdate(
      { _id: "64d3017211c2fa62e02201e9" },
      { title: { en: "munte" } }
    );
  } catch (error) {
    console.log(error);
  }
});
