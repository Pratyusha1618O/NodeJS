// modules on MongoDB

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true
    },
    redirectURL:{ // original url
        type: String,
        required: true,
        unique: true
    },
    visitHistory:[{ timestamp: { type: Number } }],
}, {timestamps: true});

const URL = mongoose.model("URL", userSchema)

module.exports = URL