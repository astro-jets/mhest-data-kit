const path = require('path')
const mongoose = require('mongoose');
const coverImageBasePath = "uploads/thumbnails";
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
    type: String
  },

  "details": {
    type: String,
    required:true
  }
})

assessmentSchema.virtual('thumbnailPath').get(function(){
  if(this.thumbnail != null)
  {
    return path.join('/', coverImageBasePath, this.thumbnail)
  }
})
module.exports = mongoose.model("assessment",assessmentSchema);
module.exports.coverImageBasePath = coverImageBasePath;