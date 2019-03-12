const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  file_name: {
    type: String,
    default: ''
  },
  file_type:{
    type: String,
    default: ''  
},
  uploaded_by: {
    type: Number,
    default: 0
  },
  uploaded_on: {
     type: Date, default: Date.now 
  },
});

module.exports = mongoose.model('Media', MediaSchema);
