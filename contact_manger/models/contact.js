const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phones: {
    type: [String], 
    default: []
  },
  socialMedia: {
    facebook: { type: String,
    default: ""
  },

    linkedin: { 
      type: String,
       default: "" 
      }
  }
});

module.exports = mongoose.model('Contact', contactSchema);