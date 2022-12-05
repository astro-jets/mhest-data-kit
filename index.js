const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017",{
    useNewUrlParser:true,useUnifiedTopology: true

},(err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("successfully connected")
    }
})

bp = require("body-parser");

//ROUTES
const expressLayouts = require('express-ejs-layouts');
const mainRouter = require('./routes/main');
const cboRouter = require('./routes/cbos');

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.set('layout', 'layouts/layout')
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bp.urlencoded({limit:'10mb', extended:false}))
app.use("/",mainRouter);
app.use("/cbos",cboRouter);

app.listen(process.env.PORT || 3000)