const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/datakit",{
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
const teamRouter = require('./routes/team');
const reportRouter = require('./routes/reports');
const requestsRouter = require('./routes/requests');
const assessmentsRouter = require('./routes/assessments');

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.set('layout', 'layouts/layout')
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bp.urlencoded({limit:'10mb', extended:false}))
app.use("/",mainRouter);
app.use("/cbos",cboRouter);
app.use("/team",teamRouter);
app.use("/reports",reportRouter);
app.use("/requests",requestsRouter);
app.use("/assessments",assessmentsRouter);

app.listen(process.env.PORT || 3000)