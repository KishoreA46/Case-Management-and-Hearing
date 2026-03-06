const express = require('express');
const router = express.Router();
const { getConversation, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

router.get('/case/:caseId', protect, getConversation);
router.post('/message', protect, sendMessage);

module.exports = router;
