var express = require('express');
var bodyParser = require('body-parser'); // take your json and covert it to an object

var {mongoose} = require('./db/mongoose'); // call the database connection
var {Todo} = require('./models/todo');   // this uses destructuring for refactoring
var {User} = require('./models/user');  //this uses destructuring for refactoring

var app = express();

app.use(bodyParser.json());  // it return a function that need to give to express

// set up a route localhost:3000/todos using post method
app.post('/todos', (req, res) => { // contain 2 args, 1 url app, 2, call func
    var todo = new Todo({
        text: req.body.text   // .text is accessing the text property of the req.body
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}); 

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos}); 
    }, (e) => {
        res.status(400).send(e);
    })
});


app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};





