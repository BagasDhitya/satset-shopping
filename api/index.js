const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const productRoutes = require("../routes/productRoutes");

const app = express();

app.use(cors());
app.use(parser.json());

app.use("/api", productRoutes);