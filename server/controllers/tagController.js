const { Tag } = require('../models');

// @desc    Get all tags
// @route   GET /api/tags
// @access  Private
const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a tag
// @route   POST /api/tags
// @access  Private (Admin)
const createTag = async (req, res) => {
    try {
        const tag = await Tag.create(req.body);
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTags, createTag };
