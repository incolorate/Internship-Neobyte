import express from "express";
import Subscription from "./models/SubscribeSchema.js";
import Ads from "./models/adSchema.js";

const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const { name: user } = req.body;

  const checkUser = await Subscription.findOne({ user: user });
  if (checkUser) {
    return res.json("User already subscribed");
  }
  await Subscription.create({ user, knowledgeOf: adsTitle });
  return res.json("User registered");
});

router.post("/newads", async (req, res) => {
  const { name: user } = req.body;
  const ads = await Ads.find({});
  const userAds = await Subscription.findOne({ user });
  let adsTitle = [];
  ads.map((ad) => adsTitle.push(ad.title));
  // If user exists compare the current ads and the ads the user has knowledge of
  const getNewAds = adsTitle.filter(
    (element) => !userAds.knowledgeOf.includes(element)
  );

  const finalAds = ads.filter((ad) => getNewAds.includes(ad.title));
  userAds.knowledgeOf.push(...getNewAds);
  await userAds.save();
  return res.json(finalAds);
});

router.post("/subscription/check", async (req, res) => {
  const { name: user } = req.body;
  const checkUser = await Subscription.findOne({ user });
  if (checkUser) {
    return res.json("Already subscribed");
  }
});

export default router;
