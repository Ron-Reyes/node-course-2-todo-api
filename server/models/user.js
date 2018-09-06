const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({  //store a schema for the user. store property like(email, pw, tokens)
    email: {
        type: String,
        required: true,
        minlength: [3, 'Minimum of 3 chars'],
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,  // short version
            // validator: (value) => { //long version
            //     return validator.isEmail(value); //  return true/false
            // },
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{   // this is an array, how we access the individual user
        access: {  //
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]   
});
   
//this will limit the details to be send back or response like id and email only. no need for pw and tokens arrays(acess, token) to return
// this is called overing certain things
UserSchema.methods.toJSON = function () {
    var user = this;

    //responsible for taking mongoose variable user and converti it to regular object where only the properties available on documents exist
    var userObject = user.toObject(); 

    return _.pick(userObject, ['_id', 'email']);// pick some properties in the userObject, such as id and email only. import lodash since we use _pick

};


//   this is an object, or instance method
UserSchema.methods.generateAuthToken = function() {   // didnt use arrow function coz it didnt use .this keyword
    var user = this;  // .this refers to manipulating anything such as user in server.js
    var access = 'auth'; // write it as is. this refers to the access above under tokens

    // it has 2 argu, object that you want to sign(user id), 123abc is the secret value. dont forget const jwt = require('jsonwebtoken');
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    // 1st argu: it get the user id using user(w/c also located in user server.js) and add access property as auth
    // 2nd argu: add the secret value 'abc123'
    // .tostring: convert the whole value to string. so the token is now a string

    // manipulating the tokens under UserSchema
    user.tokens = user.tokens.concat([{access,token}]); //this will push new objects to access and token
    //user.tokens.push({access, token}); // this is other version of the above user.tokens =
    
    // saving
    return user.save().then( () => {
        return token;
    });
};

// this is in connection with serverjs private route
UserSchema.statics.findByToken = function(token) {  // with argument : token
    var User = this;   // this is model method. Uppercase. instance method use small letter (user like above)
    var decoded;

    try {    // try catch will use to check if there's an error and catch it
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {        
        return Promise.reject('test rejected');
    }    

    // if success
    return User.findOne({    // this find the associated user if any
        '_id': decoded._id,
        'tokens.token' : token,  // tokens.token refer to the UserSchema tokens/token. and :token in function(token above)
        'tokens.access' : 'auth'
    })   
};

var User = mongoose.model('User', UserSchema);    

module.exports = {User};
