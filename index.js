const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(parser.json());

app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
