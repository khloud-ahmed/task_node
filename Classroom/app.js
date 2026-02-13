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
const Student = require("./models/Student");
const Classroom = require("./models/Classroom");



// ================= Routes =================

// POST
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);

    res.status(201).json({
      success: true,
      msg: "Student Created Successfully",
      data: newStudent,
    });
  } catch (error) {
    // handle unique email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Email already exists",
      });
    }

    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}); 
//////////////////
app.post("/api/classrooms", async (req, res) => {
  try {
    const newClassroom = await Classroom.create(req.body);

    res.status(201).json({
      success: true,
      msg: "Classroom Created Successfully",
      data: newClassroom,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// GET Books with populate
app.get("/api/classrooms", async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate("students", "name");

    res.status(200).json({
      success: true,
      count: classrooms.length,
      data: classrooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
/////////////delete 
app.delete("/api/students/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        error: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Student deleted successfully",
      data: deletedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});



// run server
app.listen(PORT, () => {
  console.log(`Server Running At Port ${PORT}`);
});
