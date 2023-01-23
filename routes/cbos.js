const express = require('express');
const router = express.Router();
const cbo = require('../models/cbo');
const fs = require('fs');
const imageMimeTypes = ['image/jpeg','image/png','image/ico']
const multer = require('multer');
const path = require('path');
const uploadPath = path.join('public',cbo.coverImageBasePath)
const upload = multer({
    dest: uploadPath,
    fileFilter:(req,file,callback)=>{
        callback(null,imageMimeTypes.includes(file.mimetype))
    }
})


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
router.post("/",upload.single('logo'), async (req,res)=>{
    const filename = req.file != null ? req.file.filename : null;

    const cboName = new cbo({
        name: req.body.name,
        tAuthority: req.body.tAuthority,
        area: req.body.area,
        males: req.body.males,
        females: req.body.females,
        chairman_name: req.body.chairman_name,
        chairman_email: req.body.chairman_email,
        chairman_phone: req.body.chairman_phone,
        logo: filename,
        description: req.body.description
    })

    try{
        const newCbo = await cboName.save();
        // res.redirect(`cbos/${newCbo.id}`)
        res.redirect(`cbos`)
    }
    
    catch{
        if(cboName.logo != null)
        {
            removeCboLogo(cbo.logo)
        }
        res.render('cbos/new',{
            cbo: cboName,
            errMessage: "Error creating CBO"
        })
    }
})

function removeCboLogo(filename)
{
    fs.unlink(path.join(uploadPath,filename),err=>{
        if (err) {console.log(err)}
    })
}
module.exports = router;