const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        default: 'anonymous'
    },
    description: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    resolved: {
        type: Boolean,
        default: false
    },
    resolvedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);