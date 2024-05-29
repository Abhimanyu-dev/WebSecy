const express = require("express")
const userRouter = express.Router()
const {registerUser, getUser, deleteUser}  = require("../controllers/user_controller")

userRouter.post("/", (req, res) => registerUser(req, res))
userRouter.post("/login", (req, res) => getUser(req, res))
userRouter.delete("/:user_id", (req, res) => deleteUser(req, res))

module.exports = userRouter