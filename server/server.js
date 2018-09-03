const _  = require ('lodash');
const express = require('express');
const bodyParser = require('body-parser'); // take your json and covert it to an object
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose'); // call the database connection
var {Todo} = require('./models/todo');   // this uses destructuring for refactoring
var {User} = require('./models/user');  //this uses destructuring for refactoring

var app = express();

// this can be set optionally: set it if running on heroku, do not set if running local
const port = process.env.PORT || 3000;   // you have to set also the port below app.listen
//const port = 3000;   // you have to set also the port below app.listen

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
    
    // this validate if ID is exist
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        // if no doc, send 404
        if(!todo){
            return res.status(404).send();
        };                    
        //if doc, send doc back with 200    
        res.send({todo}); 
    // if error
    }).catch((e) => {
        // 400 with empty boody
        res.status(404).send();
    });
});   

app.delete('/todos/:id', (req, res) => {
    // grab the id in the url localhost:3000/todos/12345679
    var id = req.params.id;

    // this validate if ID is exi
    if(!ObjectID.isValid(id)){
        // if no doc, send 404
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        };
        //if doc, send doc back with 200   
        res.send({todo});
    // if error
    }).catch((e) => {
        // 400 with empty boody
        res.status(400).send();
    });
})


//this is patch or update using http method
app.patch('/todos/:id', (req, res) => {   // 
    var id = req.params.id;  // grab the id
    var body = _.pick(req.body,['text', 'completed']);  // this is the use of lodash here. text & completed are the arrays na kukuning under sa req.body (path only)

    if(!ObjectID.isValid(id)) {  // this wil execute if id is invalid
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {  // this check if completed under body is boolean and body.completed is true
        body.completedAt = new Date().getTime();// assign the javascript time stamp to the completedAt field in the database
    } else {  // this execute if body.completed is not a boolean OR body.completed is false
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set: body}, {new: true}).then((todo) => { // new true is always in ther when you use $set along the line
        if(!todo){
            return res.status(404).send();            
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

});



//port is the const port above
app.listen(port, () => {
    //console.log(`Started on port ${port}`);\
    console.log(`Started on port ` + port);
});

module.exports = {app};





 