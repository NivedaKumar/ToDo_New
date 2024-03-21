// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/save', (req, res) => {
    const data = req.body.data;
    fs.writeFile('data.txt', data, (err) => {
        if (err) throw err;
        console.log('Data saved successfully');
        res.send('Data saved successfully');
    });
});

app.get('/read', (req, res) => {
    fs.readFile('Data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.send('Error reading file');
            return;
        }
        console.log('Data read successfully:', data);
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// const server = http.createServer((req,res)=>{
//     let filePath = '.'+req.url;
//     if(filePath==='./'){
//         filePath='./Index.html';
//     }

//     const extname = String(path.extname(filePath)).toLowerCase();
//     const contentType = {
//         '.html':'text/html',
//         '.js':'text/javascript',
//         '.css':'text/css',
//         '.jpeg': 'image/jpeg',
//         '.png':'image/png',
//     }[extname]||'application/octet-stream';

//     fs.readFile(filePath,(error,content)=>{
//         if(error){
//             console.log(error);
//             res.writeHead(404);
//             res.end();
//         }else{
//             res.writeHead(200,{'Content-Type':contentType});
//             res.end(content,'utf-8')
//         }
//     })
// });

// server.listen(port,(error)=>{
//     if(error){
//         console.log('Something is wrong' +error);
//     }else{
//         console.log('server is listening to port '+ port);
//     }
// })
