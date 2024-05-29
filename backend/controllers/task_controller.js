const {User, Task} = require("../models/models")

const getTasks = async (req, res) => {
    try{
        const user = await User.findById(req.user_id)
        if(user == null){
            res.status(400).json({message: "No user found"})
        }
        const task_ids = user.tasks
        const tasks = []
        for(let task_id in task_ids){
            const task = await Task.findById(task_ids[task_id])
            tasks.push(task)
        }
        res.json({tasks: tasks})
    }catch(error){  
        res.status(400).json({message: error})
    }
}

const createTask = async (req, res) => {
    try{
            const user = await User.findById(req.user_id)
            const newTask = new Task()
            newTask.name = req.body.name
            newTask.description = req.body.description
            newTask.isCompleted = false            
            const task = await newTask.save()
            user.tasks.push(task.id)

            await User.findOneAndUpdate({_id: req.user_id}, {tasks: user.tasks})


            res.status(200).json({message: "Task Added Successfully"})
            
    }catch(error){
        res.status(400).json({message:  error})
    }
}

const updateTask = async (req, res, task_id) => {
    try{
        const task = await Task.findById(task_id)
        const name = req.body.name
        const description = req.body.description
        const isCompleted = req.body.isCompleted
        if(name != undefined){
            task.name = name
        }
        if(description != undefined){
            task.description = description
        }
        if(isCompleted != undefined){
            task.isCompleted = isCompleted
        }

        await Task.findOneAndUpdate({_id: task_id}, task)

        res.json({message: "Task Updated"})
    } catch(error){
        res.status(400).json({message: error})
    }
}

const deleteTask = async (req, res, task_id) => {
    try{
        const user = await User.findById(req.user_id)
        await Task.deleteOne({_id: task_id})
        user.tasks.splice(user.tasks.indexOf(task_id), 1)
        await User.findOneAndUpdate({_id: req.user_id}, {tasks: user.tasks})
        res.json({message: "Task deleted successfully"})
    }catch(error) {
        res.status(400).json({message: error})
    }
}

module.exports = {
    getTasks, createTask, updateTask, deleteTask   
}