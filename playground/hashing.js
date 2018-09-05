const {SHA256} = require('crypto-js')  // get the sha256 property in the crypto-js and use it also as variable

const jwt = require('jsonwebtoken'); // a shorter version of crypto-js

var data = {
    id : 10
};

// it has 2 argu, details that you want to sign(data), 123abc is the secret value
var token = jwt.sign(data, '123abc')   // takes the object and signed it and create a hash and return a token value. the secret or salt is abc123
console.log('Token : ', token);

// decoded value will not execute if found to be different from the token
var decode = jwt.verify(token, '123abc');      // takes the token and secret and makesure the data is manipulated
console.log('Decoded :', decode)


//===============================================================================
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();  // the result is an object and should convert it to string

// console.log(`Mesage : ${message}`);  // readable
// console.log(`Hash Value : ${hash}`);  // mixed characters

// // **1 this is the original data
// var data = {    // this is the object
//     id: 4       // this is the property
// };
// var token = {
//     data, // es6 version, if the same use can use one var
//     //data : data // older version
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()    // this is the hash value of the var data above. use json.stringify to convert to string from object
//     // somesecre is called salting, they could try to rehash but they cannot get the salt value (somesecret)
// };

// // **2 data tried to manipulate // sample manipulated data
// // token.data.id = 5;
// // token.hash = SHA256 (JSON.stringify(token.data)).toString() // it has no sale, hence it will failed


// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash){
//     console.log('Data was not changed');
// } else {
//     console.log('Data was not changed, Do not trust!');
// }

//===============================================================================