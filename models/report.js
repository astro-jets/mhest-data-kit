const path = require('path')
const mongoose = require('mongoose');
const coverImageBasePath = "uploads/reportLogos";
const reportSchema = new mongoose.Schema({
  "name": {
    type: String,
    required:true
  },
  "tAuthority": {
    type: String,
    required:true
  },
  
  "area": {
    type: String,
    required:true
  },
  
  "females": {
    type: String,
    required:true
  },

  "males": {
    type: String,
    required:true
  },
  
  "chairman_name": {
    type: String,
    required:true
  },
  
  "chairman_email": {
    type: String,
    required:true
  },
  
  "chairman_phone": {
    type: String,
    required:true
  },
  
  "logo": {
    type: String
  },
  
  "description": {
    type: String,
    required:true
  }
})
reportSchema.virtual('logoPath').get(function(){
  if(this.logo != null)
  {
    return path.join('/', coverImageBasePath, this.logo)
  }
})
module.exports = mongoose.model("Report",reportSchema);
module.exports.coverImageBasePath = coverImageBasePath;