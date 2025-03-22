const express = require ('express');
const mongoose = require("mongoose");
const userRouter = require("./routes/user.js")
const { connectMongoDB } = require("./connection.js")
const {logReqRes} = require('./middlewares')

const app = express()
const PORT = 8000;

//Connection
connectMongoDB('mongodb://localhost:27017/youtube-app-1')

//middleware - plugin
app.use(express.urlencoded({extended: false}))

app.use(logReqRes("log.txt"));

//Routes
app.use('/api/users', userRouter); // /user er upor kono request asle userRouter use hobe

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))