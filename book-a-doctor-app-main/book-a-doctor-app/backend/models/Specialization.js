const mongoose = require('mongoose');

const specializationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Specialization name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String, // URL or local path
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Specialization', specializationSchema);
