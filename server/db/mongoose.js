var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // similar to promise in js
mongoose.connect(process.env.MONGODB_URI);  // connecting to database locally

module.exports = {mongoose};