const express = require('express');
const team = require('../models/team');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const imageMimeTypes = ['image/jpeg','image/png','image/ico']
const uploadPath = path.join('public',team.coverImageBasePath)
const upload = multer({
    dest: uploadPath,
    fileFilter:(req,file,callback)=>{
        callback(null,imageMimeTypes.includes(file.mimetype))
    }
})



//ALL agents
router.get("/", async (req,res)=>{

    // Searching a team
    let searchOptions = {}

    if(req.query.name !== null && req.query.name !== "")
    {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try{
        const agents = await team.find(searchOptions)
        res.render('team/index',
        {
            agents: agents, 
            searchOptions: req.query
        });
    }
    catch
    {
        res.render('/');
    }
})

//NEW team *PAGE*
router.get("/new",(req,res)=>{
    res.render('team/new',{agent: new team()});
})


// Single team
router.get("/:id",async  (req,res)=>{
    const id =  req.params.id

    try{
        const agentSingle = await team.findById(id)
        res.render('team/single',
        {
            agent: agentSingle, 
            searchOptions: req.query
        });
    }
    catch
    {
        res.render('/');
    }
})

//NEW team *FORM*
router.post("/", upload.single('avatar'), async (req,res)=>{
    const filename = req.file != null ? req.file.filename : null;
    
    const agentDetails = new team({
        name: req.body.firstname +' '+req.body.lastname ,
        phone: req.body.phone,
        email: req.body.email,
        avatar: filename,
        password: req.body.password
    })
    
    if(req.body.password != req.body.password_confirm)
    {
        res.render('team/new',{
            agent: agentDetails,
            errMessage: "Passwords do not match."
        })
    }
    else
    {

        try{
            const newAgent = await agentDetails.save();
            // res.redirect(`agents/${newCbo.id}`)
            res.redirect(`team`)
        }
        
        catch{
            if(agentDetails.avatar != null)
            {
                removeAvatar(team.avatar)
            }
            res.render('team/new',{
                team: agentDetails,
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