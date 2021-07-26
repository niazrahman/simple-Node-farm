const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

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

const tempOverview = fs.readFileSync(
    `${__dirname}/starter/templates/template-overview.html`,
    'utf8'
);
const tempCard = fs.readFileSync(
    `${__dirname}/starter/templates/template-card.html`,
    'utf8'
);
const tempProduct = fs.readFileSync(
    `${__dirname}/starter/templates/template-product.html`,
    'utf8'
);
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf8');
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) =>
    slugify(el.productName, {
        lower: true,
        replacement: '+',
    })
);
console.log(slugs);

const app = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    // overview
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html',
        });
        const cardsHtml = dataObj
            .map((el) => replaceTemplate(tempCard, el))
            .join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }
    // product
    else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html',
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }
    // api
    else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json',
        });
        res.end(data);
    }
    // 404 page
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
        });
        res.end('Page Not Found!');
    }
});

app.listen('8000', '127.0.0.1', () => {
    console.log('Server is listening on port 8000');
});
