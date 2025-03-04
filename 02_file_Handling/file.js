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
fs.appendFileSync('./test1.txt', new Date().getDate().toLocaleString());
fs.appendFileSync('./test1.txt', `Hey There\n`)

//copy
fs.cpSync("./test.txt","./copy.txt")

// unlink / delete
fs.unlinkSync("./copy.txt")

// file stats
console.log(fs.statSync("./test.txt"))

//make directory
// fs.mkdirSync("my-docs");
fs.mkdirSync("my-docs/a/b", { recursive: true });