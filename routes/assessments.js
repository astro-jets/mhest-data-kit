const express = require('express');
const assessment = require('../models/assessment');
const router = express.Router();

//ALL assessments
router.get("/", async (req,res)=>{

    // Searching a assessment
    let searchOptions = {}

    if(req.query.name !== null && req.query.name !== "")
    {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try{
        const assessments = await assessment.find(searchOptions)
        res.render('assessments/index',
        {
            assessment: assessments, 
            searchOptions: req.query
        });
    }
    catch
    {
        res.render('/');
    }
})

//NEW assessment *PAGE*
router.get("/new",(req,res)=>{
    res.render('assessments/new',{agent: new assessment()});
})


// Single assessment
router.get("/:id",async  (req,res)=>{
    const id =  req.params.id

    try{
        const assessmentsingle = await assessment.findById(id)
        res.render('assessments/single',
        {
            agent: assessmentsingle, 
            searchOptions: req.query
        });
    }
    catch
    {
        res.render('/');
    }
})

//NEW assessment *FORM*
router.post("/", async (req,res)=>{
    const assessmentDetails = new assessment({
        name: req.body.firstname +' '+req.body.lastname ,
        phone: req.body.phone,
        email: req.body.email,
        avatar: filename,
        password: req.body.password
    })

    try{
        const newAgent = await assessmentDetails.save();
        // res.redirect(`assessments/${newCbo.id}`)
        res.redirect(`assessment`)
    }
    
    catch{
        if(assessmentDetails.avatar != null)
        {
            removeAvatar(assessment.avatar)
        }
        res.render('assessments/new',{
            assessment: assessmentDetails,
            errMessage: "Error creating facilitator."
        })
    }
})

module.exports = router;