const express = require('express');
const router = express.Router();
const {
  registerDoctor,
  loginDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

router.post('/register', registerDoctor);
router.post('/login', loginDoctor);

router.route('/')
  .get(getDoctors);

router.route('/:id')
  .get(getDoctorById)
  .put(updateDoctor)
  .delete(deleteDoctor);

module.exports = router;
