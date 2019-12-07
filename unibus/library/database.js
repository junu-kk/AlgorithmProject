//Code for connecting MongoDB
var mongoose = require('mongoose');


function connectDB() {
  var mongoURI = 'mongodb://localhost:27017/unibus2';
  
  mongoose.connect(mongoURI, function (err) {
    if (err) {
      console.error('DBERROR', err);
    } else {
      console.log('UNIBUS2 mongodb connected');
    }
  });

}
module.exports = connectDB;
