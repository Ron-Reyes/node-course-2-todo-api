const expect = require ('expect');
const request = require('supertest');

const {app}  = require('./../server')  // ../server is backing up 1 directory to access the server.js
const {Todo} = require('./../models/todo'); 


// dummy todo data
const todos = [{
    text: 'First test todo',
    }, {
        text: 'Second test todo'
    }   
];


// this clear or empty the db otherwise it will cause error
beforeEach((done ) => {
    Todo.remove({}).then(() => {    // this assume remove all the todos in the db
        return Todo.insertMany(todos);    // the 2 todos in dummy, Inserts multiple documents into a collection
    }).then(() => done()); 
});

describe('POST /todos', () => {   // use describe to group all routes in the test
    it('should create a new todo', (done) => {  // done is required in this line
        var text = 'Test to do text 2';  // this is just a set up data

        request(app)   // app is passed here where we make a request on
            .post('/todos')  // the url
            .send({text})   // referring to the var text above, this is converter to json
            .expect(200)   // expecting a valid result when .send {text} is triggered
            .expect((res) => {  //start the assertion here,
                expect(res.body.text).toBe(text); // res.body.text is being test here if equal to (text) value
            })
            .end((err, res) => {  // check what is in the mongodb collection, check if its not 200 or body and text are not the same
                if (err) {
                    return done(err); // it just stop the execution 
                }

                //this fetch all the todos and verify/assert
                Todo.find({text}).then((todos) => {  // text is same as the var text above
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e)); // if the above 2 assertion is fail
            });
    });

    // this execute to the db making sure that there is no data in it
    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);                
                }
            
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);   // 2 is defined here since dummy todo data is 2
                done();            
            }).catch((e) => done(e));        
        });
    });
});


describe('GET /todos', () => {
    it('should get all todos', (done) =>{
        request(app)
            .get('/todos')
            .expect(200)            
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});