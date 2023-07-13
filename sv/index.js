import express from "express";
import productRouts from "./routes/products.js";
import mongoose from "mongoose";
import manageUsers from "./routes/manageUsers.js";
import session from "express-session";
import logger from "./middlewares/loggerMid.js";
import expressWinston from "express-winston";
import "dotenv/config";
import { createClient } from 'redis';


const client = createClient()

// Initialize app
const app = express();
const PORT = 4000;
app.listen(PORT);

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
app.get("/", (req, res) => {
  res.send("<h1>Hello Neobyte!</h1>");
});

app.get("/error", (req, res) => {
  throw new Error("ErrorError!");
});
app.use("/", productRouts);
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
