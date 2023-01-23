const express = require('express');
const request = require('../models/request');
const router = express.Router();

//ALL requests
router.get("/", async (req,res)=>{

    // Searching a request
    let searchOptions = {}

    if(req.query.name !== null && req.query.name !== "")
    {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try{
        const requests = await request.find(searchOptions)
        res.render('requests/index',
        {
            request: requests, 
            searchOptions: req.query
        });
    }
    catch
    {
        res.render('/');
    }
})

//NEW request *PAGE*
router.get("/new",(req,res)=>{
    res.render('requests/new',{agent: new request()});
})


// Single request
router.get("/:id",async  (req,res)=>{
    const id =  req.params.id

    try{
        const requestsingle = await request.findById(id)
        res.render('requests/single',
        {
            agent: requestsingle, 
            searchOptions: req.query
        });
    }
    catch
    {
        res.render('/');
    }
})

//NEW request *FORM*
router.post("/", async (req,res)=>{
    const requestDetails = new request({
        name: req.body.firstname +' '+req.body.lastname ,
        phone: req.body.phone,
        email: req.body.email,
        avatar: filename,
        password: req.body.password
    })

    try{
        const newAgent = await requestDetails.save();
        // res.redirect(`requests/${newCbo.id}`)
        res.redirect(`request`)
    }
    
    catch{
        if(requestDetails.avatar != null)
        {
            removeAvatar(request.avatar)
        }
        res.render('requests/new',{
            request: requestDetails,
            errMessage: "Error creating facilitator."
        })
    }
})

module.exports = router;