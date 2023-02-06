const mongoose = require('mongoose');
const assessmentSchema = new mongoose.Schema({  
  "cbo":{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Cbo"
  },
  "created_on":{
    type:Date,
    required:true,
    default:Date.now
  },
  "survival": {
    type: String,
    required:true
  },
  
  "trees_planted": {
    type: String,
    required:true
  },
  
  "germination": {
    type: String
  },
  
  "thumbnail": {
    type: Buffer,
    required:true
  },

  
  "thumbnailType": {
    type: String,
    required:true
  },

  "details": {
    type: String,
    required:true
  }
})

assessmentSchema.virtual('thumbnailPath').get(function(){
  if(this.thumbnail != null && this.thumbnailType != null)
  {
    return `data:${this.thumbnailType};charset=utf-8;base64,${this.thumbnail.toString('base64')}`
  }
})
module.exports = mongoose.model("assessment",assessmentSchema);