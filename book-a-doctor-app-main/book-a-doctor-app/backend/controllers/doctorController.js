const Doctor = require('../models/Doctor');

// @desc    Register a new doctor
// @route   POST /api/doctor/register
// @access  Public
exports.registerDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      qualification,
      specialization,
      experience,
      hospital,
      fee,
      availableDays,
      availableTime,
      profileImage,
      bio,
      rating
    } = req.body;

    // Check if duplicate email
    const emailExists = await Doctor.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const doctor = await Doctor.create({
      name,
      email: email.toLowerCase(),
      password, // hashed automatically by pre-save hook
      phone,
      qualification,
      specialization,
      experience,
      hospital,
      fee,
      availableDays,
      availableTime,
      profileImage,
      bio,
      rating
    });

    const doctorData = doctor.toObject();
    delete doctorData.password;

    res.status(201).json({
      success: true,
      message: 'Doctor registered successfully',
      user: doctorData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Doctor Login
// @route   POST /api/doctor/login
// @access  Public
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const doctor = await Doctor.findOne({ email: email.toLowerCase() });
    if (!doctor) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await doctor.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const doctorData = doctor.toObject();
    delete doctorData.password;

    res.status(200).json({
      success: true,
      message: 'Login Successful',
      user: doctorData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res) => {
  try {
    // Optionally allow search/filter by specialization
    const { specialization } = req.query;
    let query = {};
    if (specialization) {
      query.specialization = new RegExp(specialization, 'i');
    }

    const doctors = await Doctor.find(query).select('-password');
    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('-password');
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update doctor details
// @route   PUT /api/doctors/:id
// @access  Public
exports.updateDoctor = async (req, res) => {
  try {
    let doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Check email uniqueness if modified
    if (req.body.email && req.body.email.toLowerCase() !== doctor.email) {
      const emailExists = await Doctor.findOne({ email: req.body.email.toLowerCase() });
      if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email is already taken' });
      }
    }

    if (req.body.password) {
      doctor.password = req.body.password;
    }

    const fieldsToUpdate = [
      'name',
      'email',
      'phone',
      'qualification',
      'specialization',
      'experience',
      'hospital',
      'fee',
      'availableDays',
      'availableTime',
      'profileImage',
      'bio',
      'rating'
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === 'email') {
          doctor.email = req.body.email.toLowerCase();
        } else {
          doctor[field] = req.body[field];
        }
      }
    });

    await doctor.save();

    const doctorData = doctor.toObject();
    delete doctorData.password;

    res.status(200).json({
      success: true,
      message: 'Doctor updated successfully',
      data: doctorData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Public
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    await doctor.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
