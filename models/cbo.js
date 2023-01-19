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
    type: Number,
    required:true
  },

  "males": {
    type: Number,
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
  
  "chairman_number": {
    type: String,
    required:true
  },
  
  "logo": {
    type: String
  },
  
  "description": {
    type: String,
    required:true
  },
})

module.exports = mongoose.model("Cbo",cboSchema);