// require env
require("dotenv").config();

// require express
const express = require("express");

// create server
const app = express();

// middleware
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

// require models
const Author = require("./models/Author");
const Book = require("./models/Book");


// ================= Routes =================

// POST Author
app.post("/api/authors", async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);

    res.status(201).json({
      success: true,
      msg: "Author Created Successfully",
      data: newAuthor,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// POST Book
app.post("/api/Book", async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json({
      success: true,
      msg: "Book Created Successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// GET Books with populate
app.get("/api/Book", async (req, res) => {
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


// run server
app.listen(PORT, () => {
  console.log(`Server Running At Port ${PORT}`);
});
