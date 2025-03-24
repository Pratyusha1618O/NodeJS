const mongoose = require("mongoose")
mongoose.set("strictQuery", true) //

async function connectMongoDB(url) {
    await mongoose.connect(url)
    .then(()=> console.log("MongoDB connected"))
    .catch(()=> console.log("Mongo Error"))
}

module.exports = {
    connectMongoDB
}