const Patient = require('../models/Patient');

// @desc    Register a new patient
// @route   POST /api/patient/register
// @access  Public
exports.registerPatient = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      gender,
      age,
      dob,
      bloodGroup,
      address,
      medicalHistory,
      profileImage
    } = req.body;

    // Check if duplicate email
    const emailExists = await Patient.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const patient = await Patient.create({
      fullName,
      email: email.toLowerCase(),
      phone,
      password, // hashed automatically by pre-save hook
      gender,
      age,
      dob,
      bloodGroup,
      address,
      medicalHistory,
      profileImage
    });

    // Remove password from response
    const patientData = patient.toObject();
    delete patientData.password;

    res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      user: patientData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Patient Login
// @route   POST /api/patient/login
// @access  Public
exports.loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const patient = await Patient.findOne({ email: email.toLowerCase() });
    if (!patient) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await patient.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const patientData = patient.toObject();
    delete patientData.password;

    res.status(200).json({
      success: true,
      message: 'Login Successful',
      user: patientData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all patients
// @route   GET /api/patient
// @access  Public
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select('-password');
    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get patient by ID
// @route   GET /api/patient/:id
// @access  Public
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select('-password');
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update patient details
// @route   PUT /api/patient/:id
// @access  Public
exports.updatePatient = async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Check if email is changing and if new email exists
    if (req.body.email && req.body.email.toLowerCase() !== patient.email) {
      const emailExists = await Patient.findOne({ email: req.body.email.toLowerCase() });
      if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email is already taken' });
      }
    }

    // If password is being updated, it will go through pre-save hook or we can handle it
    if (req.body.password) {
      patient.password = req.body.password;
    }

    // Update other fields
    const fieldsToUpdate = [
      'fullName',
      'email',
      'phone',
      'gender',
      'age',
      'dob',
      'bloodGroup',
      'address',
      'medicalHistory',
      'profileImage'
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === 'email') {
          patient.email = req.body.email.toLowerCase();
        } else {
          patient[field] = req.body[field];
        }
      }
    });

    await patient.save();

    const patientData = patient.toObject();
    delete patientData.password;

    res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      data: patientData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete patient
// @route   DELETE /api/patient/:id
// @access  Public
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    await patient.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Patient deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
