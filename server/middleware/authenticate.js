var {User} = require('./../models/user');

// this is the middleware
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => { // User is the model, if received a reject from user.js try/catch reject it will got directly to the cath below
        if(!user) {  // check if theres no user
            return Promise.reject(); // if this execute it will go to .catch (e) below 401
        }
        // success response
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {  // this catch will recieve an errorr from user.js try/cathc reject
        res.status(401).send();  // this send error 401 with empty body
    });
};

module.exports = {authenticate};