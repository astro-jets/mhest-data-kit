const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
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
module.exports = mongoose.model("request",requestSchema);