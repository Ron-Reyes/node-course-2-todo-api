
const {MongoClient, ObjectID} = require('mongodb'); // this is object destructuring


// it has 2 argu. 1 string it might be the url where the db is store, 2 is a callback func
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {  //to connect to the database, TodoApp is the new db. err if an error is exist or not, client object is referiing to client.db('TodoApp')  
     if (err) {
         return console.log('Unable to connect to MongDB server.'); // return is use to prevent executing the next code w/c is success
     } 
     console.log('Connected to MongoDB server');
     const db = client.db('TodoApp') // access referencing to the database

    //---------------------------------------------------------------------------
    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name: 'Ron Reyes'}).then((result) => {
    //     console.log(result);
    // });
     
    //---------------------------------------------------------------------------

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //---------------------------------------------------------------------------

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({text: 'Something to do'}).then((result) => {
    //     console.log(result);
    // })     

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b84c3a5bafeea370228bff7')})
        .then((result) => { // ObjectID should be identical to the one declaired above
        console.log(result);
    });
    //---------------------------------------------------------------------------


    // client.close(); // this close the db connection

});













