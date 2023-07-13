import express from "express";
import productRouts from "./routes/products.js";
import mongoose from "mongoose";
import manageUsers from "./routes/manageUsers.js";
import session from "express-session";
import logger from "./middlewares/loggerMid.js";
import expressWinston from "express-winston";
import "dotenv/config";

const app = express();
app.use(express.json());
const PORT = 4000;
app.listen(PORT);

// Logger
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

// session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Hello Neobyte!</h1>");
});

app.get("/error", (req, res) => {
  throw new Error("ErrorError!");
});

app.use("/", productRouts);
app.use("/", manageUsers);

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log("Some error occurred ", error);
  });
