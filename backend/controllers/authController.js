const jwt = require('jsonwebtoken');
const admins = require('../config/admins');

// @desc    Authenticate an admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = admins.find(a => a.email === email);

        if (!admin || password !== 'admin123') {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({
            email: admin.email,
            token: generateToken(admin.email),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Generate JWT
const generateToken = (email) => {
    return jwt.sign({ email }, "hari", {
        expiresIn: '30d',
    });
};

module.exports = {
    loginAdmin,
};
