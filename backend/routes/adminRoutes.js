const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getAllComplaints, 
    resolveComplaint 
} = require('../controllers/adminController');

// GET /api/admin/complaints
router.get('/complaints', protect, getAllComplaints);

// PUT /api/admin/complaints/:id/resolve
router.put('/complaints/:id/resolve', protect, resolveComplaint);

module.exports = router;