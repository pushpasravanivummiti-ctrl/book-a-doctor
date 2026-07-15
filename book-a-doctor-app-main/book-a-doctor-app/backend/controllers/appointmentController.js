const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Public
exports.createAppointment = async (req, res) => {
  try {
    const { patient, doctor, date, time, reason } = req.body;

    // Validate if patient exists
    const patientExists = await Patient.findById(patient);
    if (!patientExists) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Validate if doctor exists
    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Check if appointment file was uploaded via multer
    let medicalReport = '';
    if (req.file) {
      // Save relative path for static serving (e.g. uploads/filename.ext)
      medicalReport = `uploads/${req.file.filename}`;
    }

    const appointment = await Appointment.create({
      patient,
      doctor,
      date,
      time,
      reason,
      status: 'Pending',
      medicalReport
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all appointments (with filters for patient/doctor and population)
// @route   GET /api/appointments
// @access  Public
exports.getAppointments = async (req, res) => {
  try {
    const { patientId, doctorId } = req.query;
    let filter = {};

    if (patientId) filter.patient = patientId;
    if (doctorId) filter.doctor = doctorId;

    const appointments = await Appointment.find(filter)
      .populate('patient', 'fullName email phone age gender bloodGroup')
      .populate('doctor', 'name email phone specialization hospital qualification fee')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Public
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'fullName email phone age gender bloodGroup')
      .populate('doctor', 'name email phone specialization hospital qualification fee');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update appointment details/status
// @route   PUT /api/appointments/:id
// @access  Public
exports.updateAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Check if new file was uploaded
    if (req.file) {
      appointment.medicalReport = `uploads/${req.file.filename}`;
    }

    // Update fields from body
    const fieldsToUpdate = ['date', 'time', 'reason', 'status'];
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        appointment[field] = req.body[field];
      }
    });

    await appointment.save();

    // Populate and send back response
    const updatedAppointment = await Appointment.findById(req.params.id)
      .populate('patient', 'fullName email phone')
      .populate('doctor', 'name email phone specialization hospital');

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: updatedAppointment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Public
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    await appointment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
