
const {MongoClient, ObjectID} = require('mongodb'); // this is object destructuring


// it has 2 argu. 1 string it might be the url where the db is store, 2 is a callback func
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {  //to connect to the database, TodoApp is the new db. err if an error is exist or not, client object is referiing to client.db('TodoApp')  
     if (err) {
         return console.log('Unable to connect to MongDB server.'); // return is use to prevent executing the next code w/c is success
     } 
     console.log('Connected to MongoDB server');
     const db = client.db('TodoApp') // access referencing to the database

    // ** THIS RETRIEVE BY ID, TEXT OR COMPLETED USING .toArray()
    //  db.collection('Todos').find(//{   mongodb returns a cursor w/c is toArray, then toArray return a promise w/c is the docs or records and display it in a callback
    //      //_id: new ObjectID('5b837dfc17bd4b9a344b8d6f') // retrievin by objectID
    //     //  text: 'Something to do'  // retrieving by text
    //     // completed: true  // retrieving by completed
    //     //    }
    // ).toArray().then((docs) => {// find{} is the query argu
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2)); 
    //  }, (err) => {
    //      console.log('Unable to fetch todos', err);
    //  }); 

     //** THIS DISPLAY THE TOTAL COUNT using .count()
    // db.collection('Todos').find().count().then((count) => {// find{} is the query argu
    //    console.log(`Todos Count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // }); 

    db.collection('Users').find({
        name: /.*Anica.*/  // use /.*text.* similar to like
    }).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err) => {
        console.log('Unable to fetch users', err);
    });


    // client.close(); // this close the db connection


});













