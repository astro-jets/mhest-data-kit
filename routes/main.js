const express = require('express');
const router = express.Router();
const cbo = require('../models/cbo');
const assessment = require('../models/assessment');

router.get("/",async (req,res)=>{    
    
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
    try{
        const cbos = await cbo.find();
        const assessments = await assessment.find();
        assessments.forEach(async ass=>{
            const cboSingle = await cbo.findById(ass.cbo);
            switch(cboSingle.tAuthority.toLocaleLowerCase().trim()) {
                case 'nkapita':
                    reportData.nkapita += parseInt(ass.survival)
                    break;

                case 'chikowi':
                    reportData.chikowi += parseInt(ass.survival)
                    break;

                case 'malemia':
                    reportData.malemia += parseInt(ass.survival)
                    break;

                case 'mlumbe':
                    reportData.mlumbe += parseInt(ass.survival)
                    break;

                case 'mwambo':
                    reportData.mwambo += parseInt(ass.survival)
                    break;

                default:
                    break;
            }
            // console.log(reportData)
        })
        
        res.render('index',{
            cbos:cbos,
            assessments:assessments,
            report:reportData
        });
    }
    catch
    {
        res.render('/');
    }
})

async function calculateRates(assessments){
    assessments.forEach(async ass=>{
        const cboSingle = await cbo.findById(ass.cbo);
        switch(cboSingle.tAuthority.toLocaleLowerCase().trim()) 
        {
            case 'nkapita':
                reportData.nkapita += parseInt(ass.survival)

            case 'chikowi':
                reportData.chikowi += parseInt(ass.survival)

            case 'malemia':
                reportData.malemia = parseInt(ass.survival)

            case 'mlumbe':
                reportData.mlumbe += parseInt(ass.survival)

            case 'mwambo':
                reportData.mwambo += parseInt(ass.survival)

            default:
        }
        console.log(reportData)
    })
    reportData.mlumbe=100;
    return(reportData);
}

module.exports = router;