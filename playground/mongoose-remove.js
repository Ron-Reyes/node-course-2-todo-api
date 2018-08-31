const {ObjectID} = require ('mongodb');

const {monogose} = require ('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {User} = require ('./../server/models/user');

// this will delete all the data in db
// Todo.remove({}).then((result) => {
//     console.log(result);    
// });

// Using .findOneAndRemove() 
// Todo.findOneAndRemove({_id: '5b88b5bf0da724a0422999b3'}).then((todo) => {
//     console.log(todo);
// });


// Using .findByIdAndRemove : 
Todo.findByIdAndRemove('5b88b5bf0da724a0422999b3').then((todo) => {
    console.log(todo);
}); 