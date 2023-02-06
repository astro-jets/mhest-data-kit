const mongoose = require('mongoose');
const cboSchema = new mongoose.Schema({
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
    type: Buffer,
    required:true
  },
  
  "logoType": {
    type: String,
    required:true
  },
  
  "description": {
    type: String,
    required:true
  }
})
cboSchema.virtual('logoPath').get(function(){
  if(this.logo != null && this.logoType != null)
  {
    return `data:${this.logoType};charset=utf-8;base64,${this.logo.toString('base64')}`
  }
})
module.exports = mongoose.model("Cbo",cboSchema);