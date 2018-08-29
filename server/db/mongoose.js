var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // similar to promise in js
mongoose.connect('mongodb://localhost:27017/TodoApp');// connecting to database

module.exports = {mongoose};

