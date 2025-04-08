const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const admins = require('../config/admins');

// @desc    Authenticate an admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find admin in hardcoded list
        const admin = admins.find(a => a.email === email);

        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);

        if (isMatch) {
            res.json({
                email: admin.email,
                token: generateToken(admin.email) // Using email as identifier
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Generate JWT
const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    loginAdmin
};