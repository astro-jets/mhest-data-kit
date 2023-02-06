const express = require('express');
const assessment = require('../models/assessment');
const router = express.Router();
const cbo = require('../models/cbo');
const fs = require('fs');
const imageMimeTypes = ['image/jpeg','image/png','image/ico']

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
            assess: assessments, 
            searchOptions: req.query
        });
    }
    catch
    {
        res.render('/');
    }
})

//NEW assessment *PAGE*
router.get("/new",async (req,res)=>{
    
    try{
        const cbos = await cbo.find();
        res.render('assessments/new',{
            cbos:cbos,
            assess:''
        });
    }
    catch
    {
        res.render('assessments/');
    }

})


// Single assessment
router.get("/:id",async  (req,res)=>{
    const id =  req.params.id

    try{
        
        const assessmentsingle = await assessment.findById(id)
        const singlecbo = await cbo.findById(assessmentsingle.cbo)
        res.render('assessments/single',
        {
            cbo : singlecbo,
            assess: assessmentsingle, 
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
        cbo: req.body.cbo,
        trees_planted: req.body.trees_planted,
        germination: req.body.germination,
        survival: req.body.survival,
        details: req.body.details
    })
    saveThumbnail(assessmentDetails,req.body.thumbnail)
    try{
        const newAsessment = await assessmentDetails.save();
        // res.redirect(`assessments/${newCbo.id}`)
        res.redirect(`assessments/`)
    }
    
    catch(err){
        const cbos = await cbo.find();
        res.render('assessments/new',{
            assess: assessmentDetails,
            cbos: cbos,
            errMessage: err
        })
    }
})


function saveThumbnail(assessmentDetails, encodedthumbnail)
{
    if(encodedthumbnail == null){return}

    const thumbnail = JSON.parse(encodedthumbnail)
    if(thumbnail != null && imageMimeTypes.includes(thumbnail.type))
    {
        assessmentDetails.thumbnail = new Buffer.from(thumbnail.data, 'base64')
        assessmentDetails.thumbnailType = thumbnail.type
    }
}
module.exports = router;