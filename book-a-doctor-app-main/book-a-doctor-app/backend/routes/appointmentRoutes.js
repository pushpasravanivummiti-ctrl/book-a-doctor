const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');

router.route('/')
  .post(upload.single('medicalReport'), createAppointment)
  .get(getAppointments);

router.route('/:id')
  .get(getAppointmentById)
  .put(upload.single('medicalReport'), updateAppointment)
  .delete(deleteAppointment);

module.exports = router;
