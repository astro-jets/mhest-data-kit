const express = require('express');
const cbo = require('../models/cbo');
const router = express.Router();

//ALL CBOs
router.get("/",(req,res)=>{
    res.render('cbos/index');
})

//NEW CBO *PAGE*
router.get("/new",(req,res)=>{
    res.render('cbos/new',{cbo: new cbo()});
})

//NEW CBO *FORM*
router.post("/",(req,res)=>{
    res.send('Creation Route');
})


module.exports = router;