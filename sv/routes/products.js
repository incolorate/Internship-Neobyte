import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import Product from "../models/productSchema.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// vezi naming conventions
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
