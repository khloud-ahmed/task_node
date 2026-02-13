/// require env
require("dotenv").config();

// require express
const express = require("express");

// create server
const app = express();

// middleware with json
app.use(express.json());

// require mongoose
const mongoose = require("mongoose");

// create port
const PORT = process.env.PORT || 3000;

// database connection
async function dbConnection() {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}
dbConnection();


// ================= Require Models =================
const Product = require("./models/Product");

// ================= Routes =================

// post
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      success: true,
      msg: "Product Created Successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// get
app.get("/api/products", async (req, res) => {
  try {
    // لو فيه query زي ?category=Electronics
    const products = await Product.find(req.query);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET Books with populate
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find().populate("author");

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ================= Run Server =================
app.listen(PORT, () => {
  console.log(`Server Running At Port ${PORT}`);
});
