import mongoose from "mongoose";
import Ad from "./adSchema.js";

const subscribeSchema = mongoose.Schema({
  user: String,
  knowledgeOf: Array,
});

const Subscription = mongoose.model("Subscription", subscribeSchema);

export default Subscription;
