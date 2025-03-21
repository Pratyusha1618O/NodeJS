const express = require ('express');
const fs = require('fs');
const mongoose = require("mongoose")

const app = express()
const PORT = 8000;

//Connection : Connect with Mongo Database
mongoose.connect('mongodb://localhost:27017/youtube-app-1')
        .then(()=> console.log("MongoDB connected"))
        .catch(err => console.log("Mongo Error", err))

// Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    job_title:{
        type: String
    },
    gender:{
        type: String
    }
}, {timestamps: true});

// model : using this schema we create a model
const User = mongoose.model('user', userSchema) // (model_name, schema) :: it will be the collection name and become plural "users"

//middleware - plugin
app.use(express.urlencoded({extended: false}))


// Routes
app.get('/users', async(req, res)=>{
    const allDBusers = await User.find({}) // gives all the users
    const html = `
    <ul>
        ${allDBusers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

// REST API points

//list all users
app.get('/api/users', async (req,res)=>{
    const allDBusers = await User.find({});
    return res.json(allDBusers)
})

app.route('/api/users/:id')
    .get(async (req, res) =>{
        const user = await User.findById(req.params.id); // find user by particular id

        if(!user){
            return res.status(404).json({msg: "User not found"})
        }

        return res.json(user)
    })
    .patch(async (req, res)=> {
        await User.findByIdAndUpdate(req.params.id, {lastName: "changed"})

        return res.json({ status: "success" });
     
    })
    .delete(async (req, res)=>{
        await User.findByIdAndDelete(req.params.id)

        return res.json({ status: "success"});
    })


//create new user
app.post('/api/users', async (req,res)=>{
    const body = req.body;
    console.log(body)
    if(!body || !body.firstName || !body.lastName || !body.email || !body.job_title){
        return res.status(400).json({msg: "all fields are required"})
    }
    
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })

    console.log(result)

    return res.status(201).json({msg: "success"})
})

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))