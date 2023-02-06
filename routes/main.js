const express = require('express');
const router = express.Router();
const cbo = require('../models/cbo');
const assessment = require('../models/assessment');
const fs = require('fs')

// fs.readFile("public/js/data.json","utf-8",(err,jsonString)=>{
//     if(err){
//         console.log("Failed to read file: ",err)
//         return;
//     }
    
//     try{
//         const customer = JSON.parse(jsonString);
//         console.log(customer.ta_data)
//     }
//     catch(err){
//         console.log("this error occured: ",err)
//     }
// });

let reportData ={
    ta_data:{
        'mlumbe':0,
        'chikowi':0,
        'nkapita':0,
        'mwambo':0,
        'malemia':0
    },

    pie_data:{
        germination:0,
        survival:0,
        motarity:0,
    }
};

router.get("/",async (req,res)=>{    
    try{
        const cbos = await cbo.find();
        const assessments = await assessment.find();
        const report = await calculateRates(assessments)
        res.render('index',{
            cbos:cbos,
            assessments:assessments,
            report:report
        });
    }
    catch(err)
    {
        res.send(err);
    }
})

async function calculateRates(assessments){
    for (let i = 0; i < assessments.length; i++) 
    {
        let ass = assessments[i]
        let cboSingle = await cbo.findById(ass.cbo);
        
        //Populate data for Pie chart
        reportData.pie_data.germination += parseInt(ass.germination)
        reportData.pie_data.survival += parseInt(ass.survival)
        if(cboSingle != null)
        {
            // Populate data for bar chart depending on Traditional Authority
            switch(cboSingle.tAuthority.toLocaleLowerCase().trim()) {
                case 'nkapita':
                    reportData.ta_data.nkapita += parseInt(ass.survival)
                    break;

                case 'chikowi':
                    reportData.ta_data.chikowi += parseInt(ass.survival)
                    break;

                case 'malemia':
                    reportData.ta_data.malemia += parseInt(ass.survival)
                    break;

                case 'mlumbe':
                    reportData.ta_data.mlumbe += parseInt(ass.survival)
                    break;

                case 'mwambo':
                    reportData.ta_data.mwambo += parseInt(ass.survival)
                    break;

                default:
                    break;
            }
        }
    }
    const arr = {
        ta_data:{
            'mlumbe':[190,230,185,370,200,110,340,222,98,79,93,292],
            'chikowi':[300,210,98,300,210,119,184,347,78,98,89,120],
            'nkapita':[300,210,98,300,210,42,184,347,78,98,89,372],
            'mwambo':[300,210,98,300,210,99,184,347,78,98,89,120],
            'malemia':[210,150,70,300,420,76,184,347,78,98,89,239]
        },

        pie_data:{
            germination:90,
            survival:60,
            motarity:40,
        }

    }
    const data = JSON.stringify(arr)
    fs.writeFile('public/js/data.json',data, err=>{
        if(err)
        {
            console.log(err)
        }else{console.log('success')}
    })
    return(arr)    
}


module.exports = router;