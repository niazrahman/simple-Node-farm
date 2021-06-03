const fs = require('fs');
const http = require('http');

// fs.readFile('./starter/txt/start.txt','utf8',(err,data1)=>{
//     if(err) return console.error('Error!!!')
//     fs.readFile(`./starter/txt/${data1}.txt`,'utf8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile('./starter/txt/append.txt','utf8',(err,data3)=>{
//             console.log(data3);

//             fs.writeFile('./starter/txt/main.txt',`${data2}\n${data3}`,'utf8',err =>{
//                 console.log('Final output added in main.txt file...')
//             })
//         })
//     })
// })

// console.log('I am reading....')
const data =  fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf8')
const dataObj = JSON.parse(data)
const app = http.createServer((req,res)=>{
    const path = req.url
    if(path==='/' || path === '/overview'){
        res.end('<h1>Hello from the server!</h1>')
    }else if(path === '/product'){
        res.end('This is product page!!')
    }else if(path === '/api'){
    
        res.writeHead(200,{
            'content-Type' : 'application/json',
        })
        res.end(data)
            
    }
    else{
        res.writeHead(404,{
            contentType : 'text/html'
        })
        res.end('Page not found!')
    }
})

app.listen('8000','127.0.0.1',()=>{
    console.log('Server is listening on port 8000')
})