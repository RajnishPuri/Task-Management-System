const express = require('express');
const { body } = require('express-validator');
const userRouter = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { registerRateLimiter } = require('../middleware/ratelimiter');

const { registerUser, login, getUserProfile, logout, getAllUsers, getAllAdmins } = require('../controllers/UserAuthController');

userRouter.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('name').isLength({ min: 3 }).withMessage('First Name Should have atleast 3 characters'),
    body('password').isLength({ min: 6 }).withMessage("Password Should have atleast 6 characters!"),
    body('role').isIn(['admin', 'user']).withMessage('Invalid Role')
], registerRateLimiter, registerUser);

userRouter.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage("Password Should have atleast 6 characters!")
], login);

userRouter.get('/profile', authMiddleware, getUserProfile);

userRouter.post('/logout', logout);

userRouter.get('/allUser', authMiddleware, isAdmin, getAllUsers);

userRouter.get('/allAdmin', authMiddleware, getAllAdmins);

module.exports = userRouter;