const express = require('express');
const assessment = require('../models/assessment');
const router = express.Router();
const cbo = require('../models/cbo');
const fs = require('fs');
const imageMimeTypes = ['image/jpeg','image/png','image/ico']
const multer = require('multer');
const path = require('path');
const uploadPath = path.join('public',assessment.coverImageBasePath)
const upload = multer({
    dest: uploadPath,
    fileFilter:(req,file,callback)=>{
        callback(null,imageMimeTypes.includes(file.mimetype))
    }
})

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
router.post("/",upload.single('thumbnail'), async (req,res)=>{
    const filename = req.file != null ? req.file.filename : null;

    const assessmentDetails = new assessment({
        cbo: req.body.cbo,
        trees_planted: req.body.trees_planted,
        germination: req.body.germination,
        survival: req.body.survival,
        details: req.body.details,
        thumbnail: filename
    })

    try{
        const newAsessment = await assessmentDetails.save();
        // res.redirect(`assessments/${newCbo.id}`)
        res.redirect(`assessments/`)
    }
    
    catch{
        
        if(assessmentDetails.thumnail != null)
        {
            removeThumbnail(assessment.thumbnail)
        }
        const cbos = await cbo.find();
        res.render('assessments/new',{
            assess: assessmentDetails,
            cbos: cbos,
            errMessage: "Error creating asessment."
        })
    }
})


function removeThumbnail(filename)
{
    fs.unlink(path.join(uploadPath,filename),err=>{
        if (err) {console.log(err)}
    })
}

module.exports = router;