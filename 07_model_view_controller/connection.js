// Connect with MongoDB
const mongoose = require("mongoose");

async function connectMongoDB(url) {
    return mongoose.connect(url)
    .then(()=> console.log("MongoDB connected"))
    .catch(err => console.log("Mongo error", err))
}

module.exports = {
    connectMongoDB
};