const {TaskModel} = require("../model/Task.model")
const {Router} = require("express");
const validateTask = require("../middlewares/taskMiddleware")

const taskController = Router();

taskController.get("/task", async(req,res)=>{
    try {
        const tasks = await TaskModel.find();
        res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

taskController.post("/task", validateTask, async (req,res)=>{
    try {
        const taskData = req.body;
        await TaskModel.insertMany(taskData);
        res.status(200).send({ message: "Task added successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" })
    }
})

taskController.patch("/task/:ID" , async(req,res)=>{
    try {
        const id = req.params.ID;
        await TaskModel.findByIdAndUpdate(id,req.body);
        res.status(200).send("Task update successfully")
    } catch (error) {
        console.log(error);
        res.status(500).send("There is an error")
    }
})

taskController.delete("/task/:ID",async(req,res)=>{
    try {
        const id = req.params.ID;
        await TaskModel.findByIdAndDelete(id,req.body);
        res.status(200).send("Task is deleted")
    } catch (error) {
        console.log(error);
        res.status(500).send("There is an error")
    }
})


module.exports={
    taskController
}