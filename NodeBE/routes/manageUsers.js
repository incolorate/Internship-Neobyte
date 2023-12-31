import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userSchema.js";
import logger from "../middlewares/loggerMid.js";

const router = express.Router();

// Register new user to db
router.post("/user/register", async (req, res) => {
  const { username, password } = req.body;

  //Check if user exists
  const findDuplicateUser = await User.findOne({
    user: username,
  });
  if (findDuplicateUser) return res.status(400).json("Username in use");

  // Validate length
  if (username.toString().length < 4)
    return res.status(400).json("Username needs to be at least 4 characters");
  if (password.toString().length < 6)
    return res.status(400).json("Password needs to be at least 6 characters");

  try {
    // Encrypt password before sending
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) return res.status(400).json("some error", err);
      await User.create({
        user: username,
        password: hash,
      });
    });
    logger.info(`${username} successfully created an account`);
    return res.status(200).json(`${username} successfully created`);
  } catch (error) {
    logger.error(
      `${error} occurred when ${username} tried to create an account`
    );
    return res.json("Some error occurred", error);
  }
});

// Login
router.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  const userInfo = await User.findOne({
    user: username,
  });

  if (!userInfo) return res.status(404).json("User or password incorrect");
  //   Password check
  bcrypt.compare(password, userInfo.password, function (err, result) {
    if (result) {
      req.session.user = { username: userInfo.user, role: userInfo.role };
      logger.info(`${username} successfully logged in`);
      return res.status(200).json(`Welcome ${userInfo.user}`);
    }
    logger.info(`${username} tried an incorrect password or username`);
    return res.status(404).json(`Password or username incorrect`);
  });
});

export default router;
