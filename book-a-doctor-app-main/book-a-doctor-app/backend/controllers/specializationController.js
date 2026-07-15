const Specialization = require('../models/Specialization');

// @desc    Create new specialization
// @route   POST /api/specializations
// @access  Public (or Admin)
exports.createSpecialization = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    // Check if duplicate
    const exists = await Specialization.findOne({ name });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Specialization already exists' });
    }

    const specialization = await Specialization.create({ name, description, image });

    res.status(201).json({
      success: true,
      message: 'Specialization created successfully',
      data: specialization
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all specializations
// @route   GET /api/specializations
// @access  Public
exports.getSpecializations = async (req, res) => {
  try {
    const specializations = await Specialization.find();
    res.status(200).json({
      success: true,
      count: specializations.length,
      data: specializations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update specialization
// @route   PUT /api/specializations/:id
// @access  Public (or Admin)
exports.updateSpecialization = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    let specialization = await Specialization.findById(req.params.id);
    if (!specialization) {
      return res.status(404).json({ success: false, message: 'Specialization not found' });
    }

    specialization = await Specialization.findByIdAndUpdate(
      req.params.id,
      { name, description, image },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Specialization updated successfully',
      data: specialization
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete specialization
// @route   DELETE /api/specializations/:id
// @access  Public (or Admin)
exports.deleteSpecialization = async (req, res) => {
  try {
    const specialization = await Specialization.findById(req.params.id);
    if (!specialization) {
      return res.status(404).json({ success: false, message: 'Specialization not found' });
    }

    await specialization.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Specialization deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
