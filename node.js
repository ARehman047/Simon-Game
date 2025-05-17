const fs = require("fs")

// fs.writeFile('Message.txt', 'Wassup my man!', (err)=> {
//     if (err) throw err;
//     console.log('File saved bro')
// })

fs.readFile('Message.txt', 'utf-8', (err, data)=>{
    if (err) throw err;
    console.log(data)
})