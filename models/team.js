const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
  "name": {
    type: String,
    required:true
  },
  "phone": {
    type: String,
    required:true
  },
  
  "email": {
    type: String,
    required:true
  },
  
  "avatar": {
    type: Buffer,
    required:true
  },
  
  "avatarType": {
    type: String,
    required:true
  },
  
  "password": {
    type: String,
    required:true
  },
})

teamSchema.virtual('avatarPath').get(function(){
  if(this.avatar != null && this.avatarType != null)
  {
    return `data:${this.avatarType};charset=utf-8;base64,${this.avatar.toString('base64')}`
  }
})
module.exports = mongoose.model("Team",teamSchema);