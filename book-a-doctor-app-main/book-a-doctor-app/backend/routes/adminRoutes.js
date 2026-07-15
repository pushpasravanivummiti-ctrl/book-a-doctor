const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdmins
} = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/', getAdmins);

module.exports = router;
