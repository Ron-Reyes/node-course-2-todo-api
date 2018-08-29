const {ObjectId} = require('mongoose')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5b864e649eb6dd27489d7f8711';

// if(!object.isValid(id)) {   // instantly validate the var id in the OBject in the db. it return true or false
//     console.log('ID is not valid');
// }
// Todo.find ({
//     _id: id
// }).then((todos) => {   // todos is todos docu in mongodb
//     console.log('TODOS', todos);  // todos is in array
// })


// Todo.findOne({
//     _id: id
// }).then((todo) => {    // todo (no s) is use meaning single return only
//     console.log('TODO', todo);
// });

// this is more preffered
// Todo.findById(id).then((todo) => {    // todo (no s) is use meaning single return only
//     if(!todo){   // if didnt exist the id
//         return console.log('Id not found'); // return is use to prevent from running the successing codes
//     }
//     console.log('TODO BY ID', todo);
// }).catch((e) => console.log(e));

var id = '5b8513e3935a821ab0210aef';

User.findById(id).then((user) => {
    if(!user){
        return console.log('Unable to find user!');
    }
    console.log('Email address : ' + user.email);
    console.log(JSON.stringify(user,undefined,2));
}, (e) => {
    console.log(e);
});
