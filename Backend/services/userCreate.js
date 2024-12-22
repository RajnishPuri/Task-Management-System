const User = require('../models/UserModel');

exports.createUser = async ({ name, email, password, role }) => {
    if (!name || !email || !password || !role) {
        throw new Error('All fields are Required!');
    }

    const user = User.create({
        name,
        email,
        password,
        role
    });

    return user;
}