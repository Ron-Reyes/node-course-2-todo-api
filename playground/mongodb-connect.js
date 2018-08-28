// const MongoClient = require('mongodb').MongoClient; // pull-off the MongoClient from the mongodb library

const {MongoClient, ObjectID} = require('mongodb'); // this is object destructuring

var obj = new ObjectID();
console.log(obj);

// var user = {name: 'Ron Reyes', age: 20}; // object destructuring
// var {name} = user;
// console.log(name);

// it has 2 argu. 1 string it might be the url where the db is store, 2 is a callback func
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {  //to connect to the database, TodoApp is the new db. err if an error is exist or not, client object is referiing to client.db('TodoApp')  
     if (err) {
         return console.log('Unable to connect to MongDB server.'); // return is use to prevent executing the next code w/c is success
     } 
     console.log('Connected to MongoDB server');
     const db = client.db('TodoApp') // access referencing to the database

    // db.collection('Todos').insertOne({ // this is a collection or table. 2 param. 1 is object to store key value pairs, 2 is callback for either successful or failed 
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2)); // result.ops=> store all the docs that where inserted
    // });

    // db.collection('Users').insertOne({
    //     name: 'Julie Reyes',
    //     age: 22,
    //     location: 'Philippines'
    // }, (err, result) => { // this is the callback func
    //     if (err) {
    //         return console.log('Unable to insert User' , err);
    //     };
    //     console.log(result.ops[0]._id.getTimestamp()); // this print the timestamp
    // });

    // client.close(); // this close the db connection


});













