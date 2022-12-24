const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app =express();
const port= process.env.PORT || 3000;

// console.log(path.join(__dirname,'../public'));
const staticPath= path.join(path.join(__dirname,'../public'));
app.use(express.static(staticPath));

const templtePath= path.join(path.join(__dirname,'../templates/views'));
const partialsPath= path.join(path.join(__dirname,'../templates/partials'));
app.set('view engine', 'hbs');
app.set('views',templtePath);
hbs.registerPartials(partialsPath);

app.get('/',(req,res)=>{
    // res.send("welcome to Home Page")
    res.render('index')
})
app.get('/about',(req,res)=>{
    // res.send("welcome to About Page")
    res.render('about')
})
app.get('/weather',(req,res)=>{
    // res.send("welcome to Weather Page")
    res.render("weather")
})
app.get('/*',(req,res)=>{
    // res.send("Error 404, Page not found!")
    res.render("404",{
        errorMsg : "Opps! Page not found"
    })
})
app.listen(port,()=>{
    console.log('Listening to port '+port);
    
})