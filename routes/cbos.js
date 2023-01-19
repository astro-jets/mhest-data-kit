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


// Single CBO
router.get("/:id",async  (req,res)=>{
    const id =  req.params.id

    try{
        const cboSingle = await cbo.findById(id)
        res.render('cbos/single',
        {
            cbo: cboSingle, 
            searchOptions: req.query
        });
    }
    catch
    {
        res.render('/');
    }
})

//NEW CBO *FORM*
router.post("/",async (req,res)=>{
    const cboName = new cbo({
        name: req.body.name,
        tAuthority: req.body.ta,
        area: req.body.area,
        males: req.body.males,
        females: req.body.females,
        chairman_name: req.body.chairman_name,
        chairman_email: req.body.chairman_email,
        chairman_phone: req.body.chairman_phone,
        logo: req.body.logo,
        description: req.body.description
    })

    try{
        console.log(req.body.name)
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