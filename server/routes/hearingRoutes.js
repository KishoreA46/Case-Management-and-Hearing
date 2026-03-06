const express = require('express');
const router = express.Router();
const {
    getHearings,
    createHearing,
    updateHearing,
    deleteHearing,
    getHearingNotes,
    addHearingNote
} = require('../controllers/hearingController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
    .get(getHearings)
    .post(authorize('admin', 'lawyer'), createHearing);

router.route('/:id')
    .put(authorize('admin', 'lawyer'), updateHearing)
    .delete(authorize('admin', 'lawyer'), deleteHearing);

router.route('/:id/notes')
    .get(getHearingNotes)
    .post(authorize('admin', 'lawyer'), addHearingNote);

module.exports = router;
