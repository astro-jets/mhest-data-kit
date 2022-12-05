const express = require('express');
const cbo = require('../models/cbo');
const router = express.Router();


//ALL CBOs
router.get("/", async (req,res)=>{

    // Searching a cbo
    let searchOptions = {}

    if(req.query.name !== null && req.query.name !== "")
    {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try{
        const cbos = await cbo.find(searchOptions)
        res.render('cbos/index',
        {
            cbos: cbos, 
            searchOptions: req.query
        });
    }
    catch
    {
        res.render('/');
    }
})

//NEW CBO *PAGE*
router.get("/new",(req,res)=>{
    res.render('cbos/new',{cbo: new cbo()});
})

//NEW CBO *FORM*
router.post("/",async (req,res)=>{
    const cboName = new cbo({
        name: req.body.name
    })

    try{
        const newCbo = await cboName.save();
        // res.redirect(`cbos/${newCbo.id}`)
        res.redirect(`cbos`)
    }
    
    catch{
        res.render('cbos/new',{
            cbo: cboName,
            errMessage: "Error creating CBO"
        })
    }
})


module.exports = router;