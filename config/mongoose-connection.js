console.log("MONGODB_URI:", process.env.MONGODB_URI); // Debug log to verify environment variable

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/KHATABOOKPROJECT';

mongoose.connect(mongoURI)
    .then(function() {
        console.log("Connected to MongoDB");
    })

module.exports = mongoose.connection;
