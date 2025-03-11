const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}:${req.url} New request received\n`
    fs.appendFile('log.txt', log, (error, data)=>{
        switch(req.url){
            case '/': res.end("HomePage");
            break;

            case '/about': res.end("I am Pratyusha");
            break;

            default:
                res.end("Not found")
        }
    })

    // console.log(req); 
    // console.log("New request received"); // when a request comes, log 'new request received'
    // res.end("Hello from server"); // response
}); // create a server for us

myServer.listen(8000, () => console.log('Server Started!')); 
// if everything goes perfectly, 'server started' msg should be shown, otherwise server isn't started






