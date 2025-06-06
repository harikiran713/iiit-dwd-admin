const Complaint = require('../models/Complaint');

// @desc    Get all complaints with sorting and filtering
// @route   GET /api/admin/complaints
// @access  Private (Admin)
const getAllComplaints = async (req, res) => {
    try {
        const { resolved, sort } = req.query;

        // Build query object
        const query = {};

        // Filter by resolved status if provided
        if (resolved) {
            query.resolved = resolved === 'true';
        }

        // Get complaints with filtering
        let complaints = Complaint.find(query);

        // Sorting
        if (sort) {
            const sortBy = {};
            if (sort === 'newest') {
                sortBy.createdAt = -1;
            } else if (sort === 'oldest') {
                sortBy.createdAt = 1;
            } else if (sort === 'most-upvotes') {
                sortBy.upvotes = -1;
            } else if (sort === 'least-upvotes') {
                sortBy.upvotes = 1;
            }
            complaints = complaints.sort(sortBy);
        } else {
            // Default sorting (newest first)
            complaints = complaints.sort({ createdAt: -1 });
        }

        // Execute query
        const result = await complaints.exec();

        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Mark complaint as resolved
// @route   PUT /api/admin/complaints/:id/resolve
// @access  Private (Admin)
const resolveComplaint = async (req, res) => {
    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            {
                resolved: true,
                resolvedAt: new Date()
            },
            {
                new: true,
                runValidators: false // Disable validation (avoid 'description is required' error)
            }
        );

        if (!updatedComplaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedComplaint
        });
    } catch (error) {
        console.error(error);

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid complaint ID'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = {
    getAllComplaints,
    resolveComplaint
};
