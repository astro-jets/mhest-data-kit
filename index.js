// if(process.env.NODE_ENV !== 'production')
// {
//     require('dotenv').parse()
// }

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mainRouter = require('./routes/main');

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.set('layout', 'layouts/layout')
app.use(expressLayouts);
app.use(express.static('public'));

// const mongoose = require('mongoose');
// mongoose.connect(process.env.DB_URL,{useNewUrlParser:true});
// const db =mongoose.connect;
// db.on('error', error => console.error(error))
// db.once('open', ()=> console.log('Connected'));

app.use("/",mainRouter);

app.listen(process.env.PORT || 3000)