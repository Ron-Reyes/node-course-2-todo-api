// the purpose of this is to make a  db for test envi
var env = process.env.NODE_ENV || 'development'; // currently on dev environment. note you have to set also the "test" in package.json
console.log('env ****', env); // just to see w/c envi is running
if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp' // you can now remove the same mongodb declaired in mongoose.js
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest' // this create a new db for test envi 
}

// NOTE: THIS DON HAVE THE MODULE.EXPORTS since this dont have the const or var is set in server.js