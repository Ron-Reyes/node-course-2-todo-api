var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {  // this create a new model, it contains 2 args 1, string name, 2nd is object. it automatically create Todo collection in db
    text: {   // this is also called as schema    
        type: String,        
        required: true,   // this is a validator. this field is required        
        minlength: 1,// this is a custom validator        
        trim: true  // removing leading and trailing spaces
    }, 
    completed: {
        type: Boolean,
        default: false    // setting a default value
    },
    completedAt: {
        type: Number,
        default: null   // setting a default value
    }    
});

module.exports = {Todo};

