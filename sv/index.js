import express from "express";
import productRoutes from "./routes/products.js";
import mongoose from "mongoose";
import manageUsers from "./routes/manageUsers.js";
import session from "express-session";
import logger from "./middlewares/loggerMid.js";
import expressWinston from "express-winston";
import "dotenv/config";
import { createClient } from "redis";

// Initialize app
const app = express();
const PORT = 4000;

let client;
(async () => {
  client = createClient();

  client.on("error", (error) => console.error(`Error : ${error}`));

  await client.connect();
  console.log("Redis connected");
})();

// Middlewares
app.use(express.json());
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.get("/", async (req, res) => {
  try {
    const cacheResults = await client.get("cached");
    if (cacheResults) {
      res.send("Hello mr. redis");
    } else {
      await client.set("cached", "some value");
      res.send("<h1>Hello Neobyte</h1>");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Nothing to see here");
  }
});

app.get("/error", (req, res) => {
  throw new Error("ErrorError!");
});
app.use("/", productRoutes);
app.use("/", manageUsers);

// Db stuff
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
