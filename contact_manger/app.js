//require env
require("dotenv").config();
//express
const express=require("express");
//create server
const app = express();
//middle ware
app.use(express.json());
//require mongoose
const mongoose =require("mongoose");
//create port 
const Port = process.env.Port || 6000;
//dbconnection
async function dbconnection(){
    try{
        await mongoose .connect(process.env.Url);
        console.log("connected");
        
    }
    catch(error){
        console.log(error)
    }
}
 dbconnection();
 //  require contact model
 const contact =require ("./models/contact");
 //post
 app.post("/api/contact", async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//get
app.get("/api/contact", async (req, res) => {
  try {
    const contact = await Contact.find();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//run server
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
