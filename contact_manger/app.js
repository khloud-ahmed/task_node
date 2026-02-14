// require env
require("dotenv").config();
// express
const express = require("express");
// create server
const app = express();
// middleware
app.use(express.json());
// require mongoose
const mongoose = require("mongoose");
// create port 
const PORT = process.env.PORT || 3000;
// db connection
async function dbconnection() {
  try {
    await mongoose.connect(process.env.Url);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
dbconnection();
// require contact model
const Contact = require("./models/contact");

// POST 
app.post("/api/contacts", async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get 
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
