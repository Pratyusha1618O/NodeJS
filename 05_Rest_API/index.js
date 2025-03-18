const express = require ('express');
const users = require('./MOCK_DATA.json');

const app = express()
const PORT = 8000;

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
        return res.json({ status: "pending" });
    })
    .delete((req, res)=>{
        return res.json({ status: "pending" });
    })


//create new user
app.post('/api/users', (req,res)=>{
    return res.json({ status: "pending" });
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