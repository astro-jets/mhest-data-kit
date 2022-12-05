const mongoose = require('mongoose');

const cboSchema = new mongoose.Schema({
  "name": {
    type: String,
    required:true
  }
})

module.exports = mongoose.model("Cbo",cboSchema);