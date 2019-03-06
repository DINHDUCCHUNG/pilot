const path= require('path');
const fs = require('fs');
console.log("hello world");
fs.writeFile('./test.txt',`
    test Nodejs
    hahahaha
`,
(err) => {
    if (err) {
        throw err;
    }
    console.log ('Write file success !!!');
});

// fs.writeFileSync();
// fs.readFile('./text.txt',{encoding:'UTF8'}, (err,data) => {
// if (err) {throw err;}
// console.log('Read file success !!!')
// console.log(data);
// });
// fs.readdir('../nodejs-introduction',(err,file) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Read dir success!!!');
//     console.log(files);
// });
// fs.unlink('path/../tungdeptrai.txt',(err) => {
//     if (err) throw err;
//     console.log('this file was deleted');
// });
// fs.watchFile('./text.txt', (current,previous)=>{
//     console.log(current);
//     console.log(previous);
// });