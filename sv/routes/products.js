import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import Product from "../models/productSchema.js";
import client from "../client.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  const cachedProducts = await client.get("products");
  console.log(cachedProducts);
  if (cachedProducts) {
    res.status(200).json(JSON.parse(cachedProducts));
    console.log("Products loaded from cache");
  } else {
    try {
      const allProducts = await Product.find();
      console.log("Loading products into cache... ");
      client.set("products", JSON.stringify(allProducts));
      res.status(200).json(allProducts);
    } catch (error) {
      res.status(500).json(error);
    }
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
    await client.del("products");
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
