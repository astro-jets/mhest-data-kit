const path = require('path')
const mongoose = require('mongoose');
const coverImageBasePath = "uploads/avatars";
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
    type: String,
  },
  
  "password": {
    type: String,
    required:true
  },
})

teamSchema.virtual('avatarPath').get(function(){
  if(this.avatar != null)
  {
    return path.join('/', coverImageBasePath, this.avatar)
  }
})
module.exports = mongoose.model("Team",teamSchema);
module.exports.coverImageBasePath = coverImageBasePath;