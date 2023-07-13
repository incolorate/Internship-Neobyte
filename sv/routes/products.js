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
    // Nu ma lasa sa folosesc json() in string template. de aia am folosti stringify!
    req.session.user
      ? logger.info(`Data fetching done from cache.
    Username: ${JSON.stringify(req.session.user)}`)
      : logger.info(`Data fetching done from cache`);
  } else {
    try {
      const allProducts = await Product.find();
      client.set("products", JSON.stringify(allProducts));
      req.session.user
        ? logger.info(`Data fetching done from DB,
    Username: ${JSON.stringify(req.session.user)}`)
        : logger.info("Data fetching done from DB, products set in cache");
      res.status(200).json(allProducts);
    } catch (error) {
      logger.info("An error occurred while fetching product data");
      res.status(500).json(error);
    }
  }
});

router.post("/products/createproduct", checkAuth, async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
    });
    await client.del("products");
    res.status(200).json(product);
    logger.info(`${JSON.stringify(req.session.user)} created a product:
    ${req.body.name},
    ${req.body.price},
    ${req.body.stock}`);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
