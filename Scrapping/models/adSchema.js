import mongoose from "mongoose";

const translationSchema = mongoose.Schema({
  ro: {
    type: String,
    default: null,
  },
  en: {
    type: String,
    default: null,
  },
  de: {
    type: String,
    default: null,
  },
});

const adSchema = mongoose.Schema({
  title: translationSchema,
  description: translationSchema,
  price: String,
  location: String,
  image: String,
});

const Ad = mongoose.model("Ad", adSchema);

export default Ad;
