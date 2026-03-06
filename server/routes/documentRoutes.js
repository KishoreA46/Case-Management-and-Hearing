const express = require('express');
const router = express.Router();
const { getCaseDocuments, uploadDocument, createFolder } = require('../controllers/documentController');
const { protect } = require('../middleware/auth');

router.get('/case/:caseId', protect, getCaseDocuments);
router.post('/upload', protect, uploadDocument);
router.post('/folders', protect, createFolder);

module.exports = router;
