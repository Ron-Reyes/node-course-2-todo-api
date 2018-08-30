var express = require('express');
var bodyParser = require('body-parser'); // take your json and covert it to an object

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose'); // call the database connection
var {Todo} = require('./models/todo');   // this uses destructuring for refactoring
var {User} = require('./models/user');  //this uses destructuring for refactoring

var app = express();

// this can be set optionally: set it if running on heroku, do not set if running local
const port = 'mongodb://<ronreyes>:<P@nica0221>@ds237192.mlab.com:37192/mongo-data' || 3000;   // you have to set also the port below app.listen

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

// GET /todos/5b864e649eb6dd27489d7f88   ==============================
app.get('/todos/:id', (req, res) => { // this create an id variable
    var id = req.params.id; // the response is "id": "5b864e649eb6dd27489d7f88"
    
    console.log(id);    
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        };                        
        res.send({todo}); 
    }).catch((e) => {
        res.status(404).send();
    });
});   

//port is the const port above
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};





 