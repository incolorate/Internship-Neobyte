import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
