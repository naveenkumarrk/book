const mongoose = require("mongoose")
require("dotenv").config()

const dbConnect = () => {
    // const connectionParams = {useNewUrlParse: true}
    mongoose.connect(process.env.DB_URL)

    mongoose.connection.on("connected", () => {
        console.log("connected to the database")
    })

    mongoose.connection.on("error", () => {
        console.log("error connecting to the database")
    })

    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB connection disconnected")
    })
}

module.exports = dbConnect