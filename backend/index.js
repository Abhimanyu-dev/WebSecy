const express = require("express")
const dotenv = require("dotenv")
const connect = require("./database/mongo")
const userRouter = require("./routes/user_routes")
const taskRouter = require("./routes/task_routes")
const { authenticateToken } = require("./middleware/jwt")


dotenv.config()
const app = express()
const PORT = process.env.PORT
const uri = process.env.MONGOURL
const database = connect(uri)

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use((req, res, next) => {
    console.log(req.url)
    next()
})


app.use("/api/user", userRouter)
app.use((req, res, next) => authenticateToken(req, res, next))
app.use("/api/task", taskRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port : ${process.env.PORT}`)
}) 