import express from "express";
import Subscription from "./models/SubscribeSchema.js";
import Ads from "./models/adSchema.js";

const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const { name: user } = req.body;
  const ads = await Ads.find({});
  //   Check if user exists
  let adsTitle = [];

  ads.map((ad) => adsTitle.push(ad.title));

  await Subscription.create({ user, knowledgeOf: adsTitle });
});

export default router;
