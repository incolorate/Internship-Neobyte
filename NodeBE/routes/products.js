import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import Product from "../models/productSchema.js";
import client from "../client.js";
import logger from "../middlewares/loggerMid.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  const cachedProducts = await client.get("products");
  // If products not in cache -> load them
  if (!cachedProducts) {
    try {
      const allProducts = await Product.find();
      client.set("products", JSON.stringify(allProducts));
      // If user logged in add more info
      req.session.user
        ? logger.info(`Data fetching done from DB,
    Username: ${JSON.stringify(req.session.user)}`)
        : logger.info("Data fetching done from DB, products set in cache");
    } catch (error) {
      logger.error(
        `The following error occurred when fetching products ${error}`
      );
      return res.status(500).json(error);
    }
  }
  return res.status(200).json(cachedProducts);
});

router.post("/products/create", checkAuth, async (req, res) => {
  // Get product info from req
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
    });
    // If new product reset cache
    await client.del("products");

    logger.info(`${JSON.stringify(req.session.user)} created a product:
    ${req.body.name},
    ${req.body.price},
    ${req.body.stock}`);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
