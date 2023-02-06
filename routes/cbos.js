const express = require('express');
const router = express.Router();
const cbo = require('../models/cbo');
const imageMimeTypes = ['image/jpeg','image/png','image/ico']


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
router.post("/", async (req,res)=>{
    const cboDetails = new cbo({
        name: req.body.name,
        tAuthority: req.body.tAuthority,
        area: req.body.area,
        males: req.body.males,
        females: req.body.females,
        chairman_name: req.body.chairman_name,
        chairman_email: req.body.chairman_email,
        chairman_phone: req.body.chairman_phone,
        description: req.body.description
    })

    savelogo(cboDetails,req.body.logo)

    try{
        const newCbo = await cboDetails.save();
        // res.redirect(`cbos/${newCbo.id}`)
        res.redirect(`cbos`)
    }
    
    catch{
        res.render('cbos/new',{
            cbo: cboDetails,
            errMessage: "Error creating CBO"
        })
    }
})

function savelogo(cboDetails, encodedlogo)
{
    if(encodedlogo == null){return}

    const logo = JSON.parse(encodedlogo)
    if(logo != null && imageMimeTypes.includes(logo.type))
    {
        cboDetails.logo = new Buffer.from(logo.data, 'base64')
        cboDetails.logoType = logo.type
    }
}

module.exports = router;