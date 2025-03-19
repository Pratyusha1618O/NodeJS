const express = require ('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express()
const PORT = 8000;

//middleware - plugin
app.use(express.urlencoded({extended: false}))


//_______UNDERSTANDING MIDDLEWARE___________________________________________________________________________
// middleware 1
app.use((req, res, next) => {
    console.log("Hello from middleware 1")
    req.myusername = "pratyu.dev"
    // fs.appendFile("log.txt", `\n${Date.now}: ${req.method}: ${req.path}`, (err, data)=>{
    //     next()
    // })
    next() 
    // calling next function => executes next operation, if there is another middleare then that will execute
})

//middleware 2
app.use((req, res, next) => {
    console.log("Hello from middleware 2", req.myusername)
    next()
})
//______________________________________________________________________________________________________


// Routes
app.get('/users', (req, res)=>{
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `

    res.send(html)
})

// REST API points

//list all users
app.get('/api/users', (req,res)=>{
    return res.json(users)
})

app.route('/api/users/:id')
    .get((req, res) =>{
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id)

        return res.json(user)
    })
    .patch((req, res)=> {
        // edit the user with id 1
        const body = req.body;
        const id = Number(req.params.id);
        let userIndex = users.findIndex((user) => user.id === id)

        users[userIndex] = {...users[userIndex], ...body}
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
            return res.json({ status: "success", id: id });
        })
     
    })
    .delete((req, res)=>{
        // delete the user with id 1
        const body = req.body;
        const id = Number(req.params.id);
        let userIndex = users.findIndex((user)=> user.id === id)

        users.splice(userIndex, 1)
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
            return res.json({ status: "success", id: id });
        })
    })


//create new user
app.post('/api/users', (req,res)=>{
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        return res.json({ status: "success", id: users.length });
    })
})

/*
// get the user with id 1
app.get('/api/users/:id', (req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)

    return res.json(user)
})


// //edit the user with id 1
app.patch('/api/users/:id', (req,res)=>{
    return res.json({ status: "pending" });
})

// //delete the user with id 1
app.delete('/api/users/:id', (req,res)=>{
    return res.json({ status: "pending" });
})
*/


app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))