import mongoose from "mongoose";

const adSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: String,
  location: String,
  image: String,
});

const Ad = mongoose.model("Ad", adSchema);

export default Ad;
