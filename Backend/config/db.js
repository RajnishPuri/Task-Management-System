const mongoose = require('mongoose');

exports.dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connected at : ', mongoose.connection.host);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};