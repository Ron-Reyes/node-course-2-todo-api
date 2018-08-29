const expect = require ('expect');
const request = require('supertest');

const {app}  = require('./../server')  // ../server is backing up 1 directory to access the server.js
const {Todo} = require('./../models/todo'); 

// this assumes that db is clear or empty otherwise it will cause error
beforeEach((done ) => {
    Todo.remove({}).then(() => {    // this assume remove all the todos in the db
        done();
    }); 
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
                Todo.find().then((todos) => {
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
                expect(todos.length).toBe(0);
                done();            
            }).catch((e) => done(e));        
        });
    });
});
