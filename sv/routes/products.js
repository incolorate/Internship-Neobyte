import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import Product from "../models/productSchema.js";
import client from "../client.js";
import logger from "../middlewares/loggerMid.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  const cachedProducts = await client.get("products");

  if (cachedProducts) {
    res.status(200).json(JSON.parse(cachedProducts));
    console.log("Products loaded from cache");
    logger.info("Data fetching done from cache");
  } else {
    try {
      const allProducts = await Product.find();
      console.log("Loading products into cache... ");
      client.set("products", JSON.stringify(allProducts));
      logger.info("Data fetching done from DB, products set in cache");
      res.status(200).json(allProducts);
    } catch (error) {
      logger.info("An error occurred while fetching product data");
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
