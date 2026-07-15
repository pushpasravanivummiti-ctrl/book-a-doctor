const express = require('express');
const router = express.Router();
const {
  registerPatient,
  loginPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient
} = require('../controllers/patientController');

router.post('/register', registerPatient);
router.post('/login', loginPatient);

router.route('/')
  .get(getPatients);

router.route('/:id')
  .get(getPatientById)
  .put(updatePatient)
  .delete(deletePatient);

module.exports = router;
