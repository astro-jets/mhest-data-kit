const express = require('express');
const team = require('../models/team');
const router = express.Router();
const imageMimeTypes = ['image/jpeg','image/png','image/ico']

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
router.post("/", async (req,res)=>{
    
    const agentDetails = new team({
        name: req.body.firstname +' '+req.body.lastname ,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    })

    saveAvatar(agentDetails, req.body.avatar)
    
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
            res.render('team/new',{
                team: agentDetails,
                errMessage: "Error creating facilitator."
            })
        }
    }
})

function saveAvatar(agentDetails, encodedAvatar)
{
    if(encodedAvatar == null){return}

    const avatar = JSON.parse(encodedAvatar)
    if(avatar != null && imageMimeTypes.includes(avatar.type))
    {
        agentDetails.avatar = new Buffer.from(avatar.data, 'base64')
        agentDetails.avatarType = avatar.type
    }
}

module.exports = router;