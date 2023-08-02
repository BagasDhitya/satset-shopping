const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const { Product } = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(parser.json());

// create product
app.post("/products", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.create({ name, price, description });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Failed to create product" });
  }
});

// all product
app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// get specific product by Id
app.get("/products/:id", async (req, res) => {
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
app.put("/products/:id", async (req, res) => {
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
app.delete("/products/:id", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
