import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import sendAds from "./sendAds.js";

// Initialize app
const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  return res.send(`<h1>Hello Neobyte</h1>`);
});

app.use("/", sendAds);

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
