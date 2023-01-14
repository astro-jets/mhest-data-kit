const express = require('express');
const router = express.Router();
const cbo = require('../models/cbo');

router.get("/",async (req,res)=>{
    
    try{
        const cbos = await cbo.find();
        res.render('index',{
            cbos:cbos
        });
    }
    catch
    {
        res.render('/');
    }
})

module.exports = router;