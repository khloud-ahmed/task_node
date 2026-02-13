
const mongoose= require("mongoose");
const taskschema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        iscompleted:{
            type:Boolean,
       default: false,
    },
},
    {timestamps:true}
);


const Task = mongoose.model("Task",taskschema);

module.exports = Task;
