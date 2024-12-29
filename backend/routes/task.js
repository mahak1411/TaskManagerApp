const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const authenticateToken = require("./auth");

// Create task route
router.post("/createTask", authenticateToken, async (req, res) => {
    try {
        const { title, desc } = req.body;
        const { id } = req.headers;

        // Create a new task
        const newTask = new Task({ title, desc });
        const savedTask = await newTask.save();

        // Add task to user's task list
        const taskId = savedTask._id;
        await User.findByIdAndUpdate(id, { $push: { tasks: taskId } });

        res.status(200).json({ message: "New task added successfully" });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch all the task
router.get("/allTasks", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
             path: "tasks" ,
             options : {sort : {createdAt : -1}}  // sorting in descending order
            });
        res.status(200).json({ data: userData })
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


// Delete Task api
router.delete("/deleteTask/:id",authenticateToken ,async (req,res) =>{
    try{
        const {id} = req.params;
        const userId = req.headers.id;
        let deletedTask = await Task.findByIdAndDelete(id);
            await User.findByIdAndUpdate(userId, {$pull : {tasks : id}});

        res.status(200).json({message : "Task Deleted successfully" , deletedTask});
    }catch(error){
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


// Update Task api
router.put("/updateTask/:id",authenticateToken ,async (req,res) =>{
    try{
        const {id} = req.params;
        const {title,  desc} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id , {title: title , desc : desc});
        res.status(200).json({message : "Task Updated successfully" , updatedTask});
    }catch(error){
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update important  Task api
router.put("/updateImpTask/:id",authenticateToken ,async (req,res) =>{
    try{
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const ImpTask = TaskData.important;
        const updatedTask = await Task.findByIdAndUpdate(id , {important : !ImpTask});
        res.status(200).json({message : "Task Updated successfully" , updatedTask});
    }catch(error){
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


// Update completed Task api
router.put("/updateCompletedTask/:id",authenticateToken ,async (req,res) =>{
    try{
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const CompleteTask = TaskData.complete;
        const updatedTask = await Task.findByIdAndUpdate(id , {complete : !CompleteTask});
        res.status(200).json({message : "Task Updated successfully" , updatedTask});
    }catch(error){
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


// Fetch all the imp task
router.get("/impTasks", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
             path: "tasks" ,
             match : {important : true},
             options : {sort : {createdAt : -1}}  // sorting in descending order
            });
        const ImpTasks = Data.tasks;
        res.status(200).json({ data: ImpTasks })
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch all the complete task
router.get("/completeTask", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
             path: "tasks" ,
             match : {complete : true},
             options : {sort : {createdAt : -1}}  // sorting in descending order
            });
        const CompletedTasks = Data.tasks;
        res.status(200).json({ data: CompletedTasks })
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch all the Incomplete task
router.get("/incompleteTask", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
             path: "tasks" ,
             match : {complete : false},
             options : {sort : {createdAt : -1}}  // sorting in descending order
            });
        const InCompletedTasks = Data.tasks;
        res.status(200).json({ data: InCompletedTasks })
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
