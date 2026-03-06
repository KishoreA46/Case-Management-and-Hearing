const express = require('express');
const router = express.Router();
const { getTags, createTag } = require('../controllers/tagController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getTags);
router.post('/', protect, authorize('admin'), createTag);

module.exports = router;
