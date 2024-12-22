const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const BlackListToken = require('../models/BlockListTokenModel');

exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided. Please log in.' });
    }

    try {
        const blackListToken = await BlackListToken.findOne({ token });
        if (blackListToken) {
            return res.status(401).json({ message: 'Token is expired or blacklisted!' });
        }

        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded_token._id);
        if (!user) {
            return res.status(401).json({ message: 'User not found. Invalid token!' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied.' });
    }
    next();
};