const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

var db = JSON.parse(fs.readFileSync('db.json'))  
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set("view options", { layout: "base.ejs" });

//routing
app.get('/',(req,res)=>{
    db = db
    res.render('index',{db:db});
})
app.listen(port,()=>{
