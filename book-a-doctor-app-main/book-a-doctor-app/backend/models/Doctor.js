const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  qualification: {
    type: String,
    trim: true
  },
  specialization: {
    type: String, // E.g., 'Cardiology'
    required: [true, 'Specialization is required'],
    trim: true
  },
  experience: {
    type: Number,
    default: 0
  },
  hospital: {
    type: String,
    trim: true
  },
  fee: {
    type: Number,
    default: 0
  },
  availableDays: {
    type: [String], // E.g., ['Monday', 'Tuesday']
    default: []
  },
  availableTime: {
    type: [String], // E.g., ['09:00 AM', '10:00 AM']
    default: []
  },
  profileImage: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Pre-save hook to hash password
doctorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with hashed password
doctorSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Doctor', doctorSchema);
