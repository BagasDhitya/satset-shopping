const express = require("express");
const router = express.Router();
const { Product } = require("../models");

// create product
router.post("/products", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.create({ name, price, description });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Failed to create product" });
  }
});

// all product
router.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// get specific product by Id
router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve product" });
  }
});

// update product
router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      await product.update({ name, price, description });
      res.json(product);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// delete product
router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      await product.destroy();
      res.json({ message: "Product deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
