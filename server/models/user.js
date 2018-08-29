var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: [3, 'Minimum of 3 chars'],
        trim: true
    }
});

module.exports = {User};
