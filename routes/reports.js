const express = require('express');
const report = require('../models/report');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const imageMimeTypes = ['image/jpeg','image/png','image/ico']
const uploadPath = path.join('public',report.coverImageBasePath)
const upload = multer({
    dest: uploadPath,
    fileFilter:(req,file,callback)=>{
        callback(null,imageMimeTypes.includes(file.mimetype))
    }
})



//ALL reports
router.get("/", async (req,res)=>{

    // Searching a report
    let searchOptions = {}

    if(req.query.name !== null && req.query.name !== "")
    {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try{
        const reports = await report.find(searchOptions)
        res.render('reports/index',
        {
            report: reports, 
            searchOptions: req.query
        });
    }
    catch
    {
        res.render('/');
    }
})

//NEW report *PAGE*
router.get("/new",(req,res)=>{
    res.render('reports/new',{agent: new report()});
})


// Single report
router.get("/:id",async  (req,res)=>{
    const id =  req.params.id

    try{
        const reportsingle = await report.findById(id)
        res.render('reports/single',
        {
            agent: reportsingle, 
            searchOptions: req.query
        });
    }
    catch
    {
        res.render('/');
    }
})

//NEW report *FORM*
router.post("/", upload.single('file'), async (req,res)=>{
    const filename = req.file != null ? req.file.filename : null;
    
    const reportDetails = new report({
        name: req.body.firstname +' '+req.body.lastname ,
        phone: req.body.phone,
        email: req.body.email,
        avatar: filename,
        password: req.body.password
    })
    
    if(req.body.password != req.body.password_confirm)
    {
        res.render('reports/new',{
            agent: reportDetails,
            errMessage: "Passwords do not match."
        })
    }
    else
    {

        try{
            const newAgent = await reportDetails.save();
            // res.redirect(`reports/${newCbo.id}`)
            res.redirect(`report`)
        }
        
        catch{
            if(reportDetails.avatar != null)
            {
                removeAvatar(report.avatar)
            }
            res.render('reports/new',{
                report: reportDetails,
                errMessage: "Error creating facilitator."
            })
        }
    }
})



function removeAvatar(filename)
{
    fs.unlink(path.join(uploadPath,filename),err=>{
        if (err) {console.log(err)}
    })
}

module.exports = router;