const expressRateLimit = require('express-rate-limit');

exports.registerRateLimiter = expressRateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after a minute.',
    },
    statusCode: 429,
});

