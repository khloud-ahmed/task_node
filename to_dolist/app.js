///require env
require("dotenv").config();

//require express 
const express =require("express");

//create server
const app = express ();

//middleware with json 
app.use(express.json());

//require mongoose
const mongoose =require("mongoose");

//create port
const Port= process.env.Port || 3000;

//database connection
async function dbConenction(){
    try{
        await mongoose .connect(process.env.Url);
        console.log("connected");
        
    }
    catch(error){
        console.log(error);
    }
}
dbConenction();

//require task model
const Task = require("./models/Task");


// Routes
app.post("/api/Task", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json({
      success: true,
      msg: "Task Created Successfully",
      data: newTask, 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
app.get("/api/Task", async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json({
      success: true,
      count: allTasks.length,
      data: allTasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// Run Server
app.listen(Port, () => {
  console.log(`server Running At Port ${Port}`);
});

