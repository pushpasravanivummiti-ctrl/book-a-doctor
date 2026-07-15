const express = require('express');
const router = express.Router();
const {
  createSpecialization,
  getSpecializations,
  updateSpecialization,
  deleteSpecialization
} = require('../controllers/specializationController');

router.route('/')
  .post(createSpecialization)
  .get(getSpecializations);

router.route('/:id')
  .put(updateSpecialization)
  .delete(deleteSpecialization);

module.exports = router;
