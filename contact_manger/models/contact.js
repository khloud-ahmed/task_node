const mongoose =require("mongoose");
const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  phones: {
    type: [String],
    default: [],
  },

  socialMedia: {
    facebook: String,
    linkedin: String,
    twitter: String,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
