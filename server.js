const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const fs = require('fs')
const app = express()
const port = 3000
app.use(express.static(__dirname + '/assets'));
var db = JSON.parse(fs.readFileSync('db.json'))  
app.use(expressLayouts);
app.set('view engine', 'ejs');  

//routing
app.get('/',(req,res)=>{
 
    db = db
    res.render('index',{db:db});
})

app.get('/:code',(req,res)=>{
    product = db[req.params.code]
    res.render('product',{product:product})
})


app.listen(port,()=>{
    console.log('server started')
})