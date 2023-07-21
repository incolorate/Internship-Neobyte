import express from "express";
import mongoose from "mongoose";
import checkAuth from "../middlewares/checkAuth.js";
import Product from "../models/productSchema.js";

// const productSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   stock: {
//     type: Number,
//     required: true,
//   },
// });

// const Product = mongoose.model("Product", productSchema);

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/createproduct", checkAuth, async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
