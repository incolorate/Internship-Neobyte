import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import sendAds from "./sendAds.js";
import cors from "cors";
import getLatestAds from "./scrapping.js";
import subscribe from "./subscribe.js";

// Initialize app
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  return res.send(`<h1>Hello Neobyte</h1>`);
});

app.use("/", sendAds);
app.use("/", subscribe);

// Comment this out when working on the code
// const runGetLatestAds = () => {
//   getLatestAds();
// };
// runGetLatestAds();
// setInterval(runGetLatestAds, 3600000);

// Connect to db
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log("Some error occurred ", error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
