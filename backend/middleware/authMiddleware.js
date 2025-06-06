const jwt = require('jsonwebtoken');
const admins = require('../config/admins');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, "hari");
            const adminExists = admins.some(a => a.email === decoded.email);

            if (!adminExists) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            req.admin = { email: decoded.email };
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
