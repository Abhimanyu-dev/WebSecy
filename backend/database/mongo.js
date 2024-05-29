const mongoose = require("mongoose")


async function connect(uri) {
    mongoose.connect(uri)
    const database = mongoose.connection
    database.on('error', (error) => {
        console.log(error)
    })

    database.once("connected", () => {
        console.log("Database Connected")
    })
    return database
}

module.exports = connect