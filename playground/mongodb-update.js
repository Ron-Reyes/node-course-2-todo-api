
const {MongoClient, ObjectID} = require('mongodb'); // this is object destructuring


// it has 2 argu. 1 string it might be the url where the db is store, 2 is a callback func
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {  //to connect to the database, TodoApp is the new db. err if an error is exist or not, client object is referiing to client.db('TodoApp')  
     if (err) {
         return console.log('Unable to connect to MongDB server.'); // return is use to prevent executing the next code w/c is success
     } 
     console.log('Connected to MongoDB server');
     const db = client.db('TodoApp') // access referencing to the database

    //findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //         _id: new ObjectID('5b84bd8bbafeea370228bff5')
    //     }, {
    //         $set: {
    //             completed: true     //should need to define also the returnOriginal to false
    //         }
    //     }, {
    //         returnOriginal: false  // this is needed to set to false in order to take the effect the changes in completed = true above
    //     }
    // ).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
            _id: new ObjectID('5b84ae72a1e1201874da83e0')
        }, {
            $set: {
                name: 'Anica Reyes'     //should need to define also the returnOriginal to false
            },
            $inc: {
                age: 1
            }
        }, {
            returnOriginal: false  // this is needed to set to false in order to take the effect the changes in completed = true above
        }
    ).then((result) => {
        console.log(result);
    });


    // client.close(); // this close the db connection

});













