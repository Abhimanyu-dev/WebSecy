const express = require("express")
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/task_controller")
const taskRouter = express.Router()


taskRouter.get("/", (req, res) => getTasks(req, res))
taskRouter.post("/", (req, res) => createTask(req, res))
taskRouter.put("/:task_id", (req, res) => updateTask(req, res, req.params.task_id))
taskRouter.delete("//:task_id", (req, res) => deleteTask(req, res, req.params.task_id))

module.exports = taskRouter