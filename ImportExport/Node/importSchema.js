import mongoose from "mongoose";

let dataSchema = mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  company: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const Data = mongoose.model("Data", dataSchema);

export default Data;
