const mongoose = require("mongoose")
const crypto = require("crypto")

const TaskSchema = new mongoose.Schema({
    task_id: Number,
    name: String,
    description: String,
    isCompleted: Boolean
})

const UserSchema = new mongoose.Schema({
    user_id: Number,
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    hash: String,
    salt: String,
    tasks: Array
})

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex")    
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString("hex")
}

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString("hex")
    return this.hash === hash
}

const Task = mongoose.model("task", TaskSchema)
const User = mongoose.model("user", UserSchema)

module.exports = {
    User, Task
}

