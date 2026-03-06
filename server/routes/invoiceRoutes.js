const express = require('express');
const router = express.Router();
const { getInvoices, createInvoice, updateInvoice } = require('../controllers/invoiceController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
    .get(getInvoices)
    .post(authorize('admin', 'lawyer'), createInvoice);

router.route('/:id')
    .put(authorize('admin', 'lawyer'), updateInvoice);

module.exports = router;
