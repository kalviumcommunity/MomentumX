const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  projectsList: {
    type: [String],
    required: true
  }
}, { versionKey: false });

const User = mongoose.model('userslists', userSchema);

module.exports = User;