import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userSchema.js";

// Definitie user schema
// const userSchema = new mongoose.Schema({
//   user: {
//     type: String,
//     unique: true,
//     required: true,
//     minlength: 4,
//   },
//   password: {
//     type: String,
//     minlength: 6,
//     required: true,
//   },
//   role: {
//     type: String,
//     default: "Basic",
//     required: true,
//   },
// });

// const User = mongoose.model("User", userSchema);

const router = express.Router();

// Register new user to db
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  //Check if user exists
  const findDuplicateUser = await User.findOne({
    user: username,
  });
  if (findDuplicateUser) return res.status(400).json("Username in use");
  // Validate length
  if (username.toString().length < 4)
    res.status(400).json("Username needs to be at least 4 characters");
  if (password.toString().length < 6)
    res.status(400).json("Password needs to be at least 6 characters");
  try {
    // Encrypt password before sending
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) return res.status(400).json("some error", err);
      await User.create({
        user: username,
        password: hash,
      });
    });
    res.status(200).json(`${username} successfully created`);
  } catch (error) {
    res.json("Some error occurred", error);
  }
});

// Const userData
export let userData = {};

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userInfo = await User.findOne({
    user: username,
  });
  //   Password
  bcrypt.compare(password, userInfo.password, function (err, result) {
    if (result) {
      //  Intreaba maine -> prima oara salbat datele in varabila....
      req.session.user = { username: userInfo.user, role: userInfo.role };
      console.log(req.session.user);
      return res.status(200).json(`Welcome ${userInfo.user}`);
    }
  });
});

export default router;
