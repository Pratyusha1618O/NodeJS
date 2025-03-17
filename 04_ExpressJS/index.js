const express = require('express');

const app = express() // handler function

app.get('/', (req, res) => {
    return res.send("Hello from home page")
})

app.get('/about', (req, res) =>{
    return res.send("Hello from home page")
    // return res.send(`Hello ${req.query.name}`)
})


app.listen(8000, () => console.log('Server Started!')); 
