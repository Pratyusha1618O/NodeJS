const fs = require('fs');

// sync
fs.writeFileSync('./test.txt', 'Hey There'); // file name, text
// it will create a new file with text 'Hey There'


// Async
fs.writeFile('./test.txt', 'Hey There async', (err)=> {}) // expects a callback


// read
const read = fs.readFileSync('./contact.txt', "utf-8");
console.log(read);

// async
fs.readFile('./contact.txt', "utf-8", (err, result)=>{ //takes a callback with error and result (err, result)
    if(err){
        console.log(err);
    }else{
        console.log(result)
    }
})

//____________________________________________________________________________________
fs.appendFileSync('./test.txt', new Date().getDate().toLocaleString());