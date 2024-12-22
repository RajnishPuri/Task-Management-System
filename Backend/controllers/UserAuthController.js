const User = require('../models/UserModel');
const BlackListToken = require('../models/BlockListTokenModel');
const { createUser } = require('../services/userCreate');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await User.hashPassword(password);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists!" });
        }

        const user = await createUser({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            success: true,
            message: "User created successfully!",
            user
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Failed to create user!",
            error: e.message
        });

    }

}

exports.login = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required!"
            });
        }

        const user = await User.findOne({ email: email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password!"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password!"
            });
        }

        const token = await user.generateAuthToken();
        res.cookie('token', token, {
            httpOnly: true,
        });

        res.setHeader('Authorization', `Bearer ${token}`);

        res.status(200).json({
            success: true,
            message: "Login successful!",
            token
        });
    }
    catch (e) {
        return res.status(501).json({ success: false, message: "Server Issue!" })
    };
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        return res.status(201).json({
            user
        })
    }
    catch (e) {
        return res.status(501).json({ success: false, message: "Server Issue!" })
    }

}

exports.logout = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        await BlackListToken.create({ token });
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged Out' });
    }
    catch (e) {
        return res.status(401).json({ success: false, message: "User Already Logged Out!" })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: "admin" } }, "_id name email");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err.message });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const users = await User.find({ role: "admin" }, "_id name email");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch admins", error: err.message });
    }
};


